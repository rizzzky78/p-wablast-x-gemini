const { GoogleCloudAIFile } = require("@controllers/gemini/api/google");
const { Tool } = require("@controllers/handler/tools");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["upload-file-pdf"],
  callback: async ({ msg, client, fullArgs }) => {
    const file =
      (await msg.download("buffer")) ||
      (msg.quoted && (await msg.quoted.download("buffer")));

    msg.react("👍🏻").then(async () => {
      await GoogleCloudAIFile.uploadFile(file, fullArgs.trim()).then(
        (result) => {
          return client.sendMessage(msg.from, {
            text: JSON.stringify(result, null, 2),
          });
        }
      );
    });
  },
};
