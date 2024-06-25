/**
 * @type { import("@google/generative-ai").FunctionDeclarationsTool[] }
 */
const functionDeclarationTool = [
  {
    functionDeclarations: [
      {
        name: "",
        description: "",
        parameters: {
          type: "STRING",
          properties: {
            k: "v",
          },
          description: "",
          required: ["query"],
        },
      },
    ],
  },
];

const functionCallMapper = {
  /**
   *
   * @param { string } param0
   */
  get_information: async ({ query }) => {
    return "Informations";
  },
};


module.exports = { functionDeclarationTool, functionCallMapper };
