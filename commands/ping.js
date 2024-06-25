const moment = require("moment");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["ping"],
  waitMessage: true,
  callback: async ({ msg, message }) => {
    return msg.reply(
      `*_${moment
        .duration(
          Date.now() - parseInt(message.messageTimestamp.toString()) * 1000
        )
        .asSeconds()} second(s)_*`
    );
  },
};
