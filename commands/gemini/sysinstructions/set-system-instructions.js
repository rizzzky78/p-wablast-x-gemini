const { quickMessage } = require("@controllers/gemini/msg-info");
const { Persona } = require("@controllers/gemini/persona");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["set-persona"],
  callback: async ({ msg, fullArgs }) => {
    if (!fullArgs || fullArgs.length <= 20) {
      return msg.reply(quickMessage("invalid_persona_args"));
    } else {
      msg.react("👍🏻").then(async () => {
        const result = await Persona.setPersona(fullArgs.trim());
        return msg.reply(
          `Success change persona/system instructions to:\n\n${result}`
        );
      });
    }
  },
};
