const { Gemini } = require("@controllers/gemini");
const { quickMessage } = require("@controllers/gemini/msg-info");
const logger = require("@libs/utils/logger");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["clear"],
  callback: async ({ msg }) => {
    await Gemini.clearUserChat({ id: msg.senderNumber })
      .then(() => {
        return msg.reply(quickMessage("success_clear_chat"));
      })
      .catch((e) => {
        console.error(e);
        logger.error(e);
        return msg.reply(quickMessage("error_occured"));
      });
  },
};
