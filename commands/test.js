/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["test"],
  waitMessage: true,
  callback: async ({ client, msg }) => {
    return client.sendMessage(msg.from, {
      text: "Indeed, this is a test!",
    });
  },
};
