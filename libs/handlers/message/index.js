const { getContentType } = require("@adiwajshing/baileys");
const { serialize } = require("@libs/utils/serialize");
const { commands } = require("@libs/constants/command");
const { cooldown } = require("@libs/utils/cooldown");

const moment = require("moment-timezone");
const chalk = require("chalk");
const logger = require("@libs/utils/logger");
const { Gemini } = require("@controllers/gemini");

/**
 * **Core Message Handler**
 * @type { import("./message.handler").MessageHandler }
 */
async function MessageHandler(client, { messages, type }) {
  const message = messages[0];
  if (message.key && message.key.remoteJid === "status@broadcast") return;
  if (!message.message) return;
  message.type = getContentType(message.message);
  /**
   * @type { string }
   */
  const body =
    message.message?.conversation ||
    message.message[message.type]?.text ||
    message.message[message.type]?.caption ||
    message.message?.listResponseMessage?.singleSelectReply?.selectedRowId ||
    message.message?.buttonsResponseMessage?.selectedButtonId ||
    message.message?.templateButtonReplyMessage?.selectedId ||
    null;

  client.readMessages([message.key]);

  const msg = await serialize(message, client);
  if (
    message.type === "protocolMessage" ||
    message.type === "senderKeyDistributionMessage" ||
    !message.type
  )
    return;

  if (msg.responseId) {
    msg.body = msg.responseId;
  }

  const command = msg.body?.trim()?.split(/ +/)?.shift()?.toLowerCase() || null;
  const args = msg.body?.trim()?.split(/ +/)?.slice(1);
  const fullArgs = msg.body?.replace(command, "")?.slice(1).trim() || null;
  const messageArgs = msg.body || null;

  const getCommand =
    commands.get(command) ||
    commands.find((v) => v?.aliases && v?.aliases?.includes(command));

  if (!getCommand) {
    if (msg.isGroup) return;
    if (msg.isSelf) return;
    msg.react("👍🏻").then(async () => {
      const mediaMessage =
        (await msg.download("buffer")) ||
        (msg.quoted && (await msg.quoted.download("buffer"))) ||
        null;
      await Gemini.generative({
        user: {
          id: msg.senderNumber,
          tagname: msg.pushName,
          prompt: messageArgs,
        },
        inlineData: {
          img: mediaMessage,
        },
      })
        .then((geminiResponse) => {
          return client.sendMessage(msg.from, {
            text: geminiResponse,
          });
        })
        .catch((e) => {
          console.error(e);
          logger.error(e);
          return msg.reply("AN ERROR OCCURED!");
        });
    });
  }

  if (getCommand) {
    const command_log = [
      chalk.whiteBright(`[ ${new Date().toISOString()} ]`),
      chalk.yellowBright(`[  COMMAND  ] :`),
      chalk.magentaBright(command),
      chalk.greenBright("from"),
      chalk.cyanBright(
        `${msg.pushName} | ${msg.senderNumber.substring(0, 9) + "xxx"}`
      ),
    ];
    if (msg.isGroup) {
      command_log.push(chalk.greenBright("in"));
      command_log.push(chalk.yellow(msg.groupMetadata.subject));
    }

    console.log(...command_log);

    if (getCommand.cooldown) {
      const cooldownBuilder = `${msg.senderNumber}-${command}`;
      if (
        cooldown.get(cooldownBuilder) &&
        cooldown.get(cooldownBuilder) > moment()
      ) {
        const duration = moment.duration(
          cooldown.get(cooldownBuilder).diff(moment())
        );
        const time = Math.round(duration.asSeconds());
        return msg.reply(`Sedang cooldown ${time} detik.`);
      }
      if (
        !cooldown.get(cooldownBuilder) ||
        (cooldown.get(cooldownBuilder) &&
          cooldown.get(cooldownBuilder) < moment())
      ) {
        cooldown.set(
          cooldownBuilder,
          moment().add(moment.duration(getCommand.cooldown))
        );
        setTimeout(() => cooldown.delete(cooldownBuilder), getCommand.cooldown);
      }
    }

    if (getCommand.waitMessage) {
      if (typeof getCommand.waitMessage === "string") {
        await msg.reply(getCommand.waitMessage);
      } else {
        await msg.reply("_Mohon tunggu sebentar..._");
      }
    }

    return await getCommand.callback({
      client,
      message,
      msg,
      command,
      args,
      fullArgs,
    });
  }
}
module.exports = MessageHandler;
