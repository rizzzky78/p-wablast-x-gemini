const { Persona } = require("@controllers/gemini/persona");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["change-persona"],
  callback: async ({ msg }) => {
    msg.react("👍🏻").then(async () => {
      const result = await Persona.switchPersona();
      return msg.reply(
        `Success switch persona/system instructions to: *${result}* persona.`
      );
    });
  },
};
