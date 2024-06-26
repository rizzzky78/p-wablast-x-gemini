const { commands, cmdModules } = require("@libs/constants/command");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["list-cmd"],
  callback: async ({ msg, client }) => {
    /**
     * @type { Array<{ key: string; description: string }> }
     */
    const cmds = [
      {
        key: "clear",
        description: "Clear chat session to start a new topic.",
      },
      {
        key: "get-dataset",
        description: "Get current dataset in text format.",
      },
      {
        key: "update-dataset",
        description: `Update current dataset in plain text format. Example cmd format: *update-dataset <dataset args>*`,
      },
      {
        key: "change-persona",
        description: `Update or change persona. If current persona is *origin* persona then it will set to *mod* persona, this will happen vice versa.`,
      },
      {
        key: "get-persona",
        description: `Get current *dynamic* persona in plain text format.`,
      },
      {
        key: "set-persona",
        description: `Modify or update *dynamic* persona using plain text format. Example cmd format: *set-persona <persona args>*. You only can modify *mod* persona.`,
      },
      {
        key: "list-cmd",
        description: `Get of all CMD keys in list.`,
      },
    ];
    return msg.reply("*List of All Cmds*\n\n" +
      cmds
        .map((v, i) => `${i + 1}. keyword: *${v.key}*\n- _${v.description}_`)
        .join("\n\n")
    );
  },
};
