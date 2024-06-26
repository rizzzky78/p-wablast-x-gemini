const schedule = require("node-schedule");
const {
  collections: { user },
} = require("@database/router");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const chalk = require("chalk");
const { Dataset } = require("./dataset");
const { Persona } = require("./persona");
const logger = require("@libs/utils/logger");
const { GoogleCloudAIFile } = require("./api/google");

const { FileState } = require("@google/generative-ai/files");

/**
 * **Google Gemini AI**
 */
class Gemini {
  /**
   *
   * @param { import("./gemini").CreateUserDto } dto
   */
  static async createUser({ id, tagname, content }) {
    await user.insertOne({
      id,
      tagname,
      timestamp: new Date().toISOString(),
      countchats: 1,
      chats: content,
    });
  }

  /**
   *
   * @param { { id: string } } param0
   */
  static async resetUserChats({ id }) {
    await user.findOneAndDelete({ id });
  }

  /**
   *
   * @param { string } id
   */
  static async readUserData(id) {
    const userData = await user.findOne({ id });
    return userData ? userData : null;
  }

  /**
   *
   * @param { import("./gemini").UpdateUserDto } dto
   */
  static async updateUserData({ id, content }) {
    await user.updateOne(
      { id },
      {
        $set: {
          timestamp: new Date().toISOString(),
          chats: content,
        },
        $inc: {
          countchats: 1,
        },
      }
    );
  }

  /**
   *
   * @param { { id: string } } dto
   */
  static async clearUserChat({ id }) {
    await user.findOneAndUpdate(
      { id },
      {
        $set: {
          countchats: 0,
        },
        $push: {
          chats: {
            $each: [],
            $slice: 2,
          },
        },
      }
    );
  }

  static async autoClearChatSession() {
    const getTime = new Date(Date.now() - 1 * 60 * 60 * 1000);
    await user.updateMany(
      {
        timestamp: { $lt: getTime.toISOString() },
      },
      {
        $set: {
          countchats: 0,
          chats: [],
        },
      }
    );
    logger.info("Cleared inactive chat sessions");
  }

  /**
   * **Google Gemini Chat Completions**
   * @param { import("@libs/utils/serialize").Serialize } msg
   * @param { import("./gemini").GenerativeChatDto } dto
   */
  static async generative(msg, { user, inlineData }) {
    const { id, tagname, prompt } = user;
    const gemini = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);

    /**
     * @type { import("./gemini").GeminiFlash | import("./gemini").GeminiPro }
     */
    const selectedModel = "gemini-1.5-pro";

    const model = gemini.getGenerativeModel({
      model: selectedModel,
      systemInstruction: Persona.getPersona(),
      // tools: functionDeclarationTool,
      // toolConfig: {
      //   functionCallingConfig: {
      //     mode: "AUTO",
      //   },
      // },
    });

    const existingUser = await this.readUserData(id);

    /**
     * @type { import("@google/generative-ai").Content[] }
     */
    const sessionChat = existingUser ? existingUser.chats : [];

    if (sessionChat.length < 1 || !sessionChat) {
      logger.info(`User ${id} - API response appended!`);
      sessionChat.push(...Dataset.injectInitialData(tagname));
    }

    if (inlineData.img) {
      const resultImg = await GoogleCloudAIFile.uploadFile(inlineData.img);
      msg.reply("Analyzing, this maybe take a few moment...");

      await new Promise((resolve) => setTimeout(resolve, 3500));

      const visionImage = await model.generateContent([
        {
          fileData: {
            mimeType: resultImg.file.mimeType,
            fileUri: resultImg.file.uri,
          },
        },
        {
          text: prompt,
        },
      ]);
      const visionResponseText = visionImage.response.text();
      sessionChat.push(
        ...Dataset.injectVisionResponse(prompt, visionResponseText)
      );
      existingUser
        ? await this.updateUserData({ id, content: sessionChat })
        : await this.createUser({ id, tagname, content: sessionChat });
      return visionResponseText;
    }

    if (inlineData.doc) {
    }

    if (inlineData.vid) {
      const resultVid = await GoogleCloudAIFile.uploadFile(inlineData.vid);
      msg.reply("This maybe take a few moment...");

      let fileVideo = await GoogleCloudAIFile.getFile(resultVid.file.name);
      while (fileVideo.state === FileState.PROCESSING) {
        process.stdout.write(".");
        // Sleep for 10 seconds
        await new Promise((resolve) => setTimeout(resolve, 10_000));
        msg.reply("Processing..");
        fileVideo = await GoogleCloudAIFile.getFile(resultVid.file.name);
      }

      if (resultVid.file.state === FileState.FAILED) {
        return msg.reply("Cannot process the attached Video!");
      }

      const visionVideoResponse = await model.generateContent([
        {
          fileData: {
            mimeType: resultVid.file.mimeType,
            fileUri: resultVid.file.uri,
          },
        },
        {
          text: prompt,
        },
      ]);
      const visionVideResponseText = visionVideoResponse.response.text();
      sessionChat.push(
        ...Dataset.injectVisionResponse(prompt, visionVideResponseText)
      );
      existingUser
        ? await this.updateUserData({ id, content: sessionChat })
        : await this.createUser({ id, tagname, content: sessionChat });
      return visionVideResponseText;
    }

    const chat = model.startChat({
      history: sessionChat,
    });

    const result = await chat.sendMessage(prompt);

    logger.info(chalk.magentaBright(`User ${id} uses autochat`));

    const content = await chat.getHistory();
    existingUser
      ? await this.updateUserData({ id, content })
      : await this.createUser({ id, tagname, content });

    return result.response.text();
  }

  /**
   * **Google Gemini Chat Completions**
   * @param { Buffer } img
   * @param { { id: string; tagname: string; prompt: string } } dto
   */
  static async visionPro(img, { id, tagname, prompt }) {
    const gemini = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);
    /**
     * @type { GeminiModelMapper }
     */
    const selectedModel = "gemini-1.0-pro-latest";
    const model = gemini.getGenerativeModel({
      model: selectedModel,
      systemInstruction: Persona.getPersona(),
    });
    const visionResponse = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: img.toString("base64"),
          mimeType: "image/png",
        },
      },
    ]);
    return visionResponse.response.text();
  }
}

// Schedule the task to run every two hours
schedule.scheduleJob("0 */2 * * *", async () => {
  await Gemini.autoClearChatSession();
});

module.exports = { Gemini };
