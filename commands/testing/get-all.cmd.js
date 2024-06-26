const { commands, cmdModules } = require("@libs/constants/command");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["list-cmd"],
  callback: async ({ msg, client }) => {
    /**
     * @type { Array<{ key: string; expectedArgs: string; exampleArgs: string; description: string }> }
     */
    const instanceCmd = [];
    for (const modules in cmdModules) {
      cmdModules[modules]
        .filter((v) => v.category === typeCmd)
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((v) => {
          instanceCmd.push({
            key: v.name,
            expectedArgs: v.expectedArgs,
            exampleArgs: v.name + " " + v.exampleArgs,
            description: v.description,
          });
        });
    }
    
    return client.sendMessage(msg.from, {
      text: JSON.stringify(instanceCmd),
    });
  },
};
