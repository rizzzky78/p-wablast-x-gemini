const { textFormat } = require("@controllers/gemini/msg-info");
const { Persona } = require("@controllers/gemini/persona");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["change-persona"],
  callback: async ({ msg }) => {
    msg.react("👍🏻").then(async () => {
      const result = await Persona.switchPersona();
      return msg.reply(textFormat("change_persona", result));
    });
  },
};
