const { GoogleCloudAIFile } = require("@controllers/gemini/api/google");
const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["transcribe"],
  callback: async ({ msg, client, fullArgs }) => {

    msg.react("👍🏻").then(async () => {
      const data = await GoogleCloudAIFile.getFile("files/7l7y0qp5uuc4");

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
      });
      const result = await model.generateContent([
        {
          fileData: {
            mimeType: data.mimeType,
            fileUri: data.uri,
          },
        },
        {
          text: fullArgs,
        },
      ]);
      return client.sendMessage(msg.from, {
        text: result.response.text(),
      });
    });
  },
};
