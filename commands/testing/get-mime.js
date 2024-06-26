const { Tool } = require("@controllers/handler/tools");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["get-mimetype"],
  callback: async ({ msg, client }) => {
    const file =
      (await msg.download("buffer")) ||
      (msg.quoted && (await msg.quoted.download("buffer")));

    const result = await Tool.getMimeTypeFromBuffer(file);
    return client.sendMessage(msg.from, {
      text: JSON.stringify(result, null, 2),
    });
  },
};
