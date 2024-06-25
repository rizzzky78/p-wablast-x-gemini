const { Dataset } = require("@controllers/gemini/dataset");
const { quickMessage } = require("@controllers/gemini/msg-info");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["update-dataset"],
  callback: async ({ msg, fullArgs, client }) => {
    if (!fullArgs || fullArgs.length <= 50) {
      return msg.reply(quickMessage("invalid_dataset_args"));
    } else {
      msg.react("👍🏻").then(async () => {
        const result = await Dataset.updateDataset(fullArgs);
        return msg.reply(`Success change dataset to:`).then(() => {
          return client.sendMessage(msg.from, {
            text: result,
          });
        });
      });
    }
  },
};
