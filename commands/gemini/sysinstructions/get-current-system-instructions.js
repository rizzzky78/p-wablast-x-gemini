const { textFormat } = require("@controllers/gemini/msg-info");
const { Persona } = require("@controllers/gemini/persona");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["get-persona"],
  callback: async ({ msg, client }) => {
    msg.react("👍🏻").then(async () => {
      const { current, persona } = await Persona.getPersona();
      return msg.reply(textFormat("get_persona", current)).then(() => {
        return client.sendMessage(msg.from, {
          text: persona.trim(),
        });
      });
    });
  },
};
