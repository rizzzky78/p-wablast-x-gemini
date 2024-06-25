const {
  collections: { user },
} = require("@database/router");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["reset"],
  waitMessage: true,
  callback: async ({ msg, message }) => {
    await user.deleteMany({}).then(({ deletedCount }) => {
      return msg.reply(`Deleted ${deletedCount} user chats.`);
    });
  },
};
