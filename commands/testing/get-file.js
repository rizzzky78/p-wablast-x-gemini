const { GoogleCloudAIFile } = require("@controllers/gemini/api/google");
const { Tool } = require("@controllers/handler/tools");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["get-file"],
  callback: async ({ msg, client, fullArgs }) => {
    msg.react("👍🏻").then(async () => {
      await GoogleCloudAIFile.getFile(fullArgs.trim()).then((result) => {
        return client.sendMessage(msg.from, {
          text: JSON.stringify(result, null, 2),
        });
      });
    });
  },
};
