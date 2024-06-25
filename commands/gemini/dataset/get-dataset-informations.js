const { Dataset } = require("@controllers/gemini/dataset");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["get-dataset"],
  callback: async ({ client, msg }) => {
    msg.react("👍🏻").then(async () => {
      const result = await Dataset.getCurrentDataset();
      return client.sendMessage(msg.from, {
        text: result,
      });
    });
  },
};
