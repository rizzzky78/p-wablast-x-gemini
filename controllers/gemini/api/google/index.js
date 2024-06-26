const { Tool } = require("@controllers/handler/tools");
const { GoogleAIFileManager } = require("@google/generative-ai/files");
const { writeFile, readFile } = require("fs").promises;
const cryptoRandomString = require("crypto-random-string");

class GoogleCloudAIFile {
  static fileManager = new GoogleAIFileManager(process.env.GEMINI_APIKEY);

  /**
   *
   * @param { Buffer } buffer
   * @param { string } filename
   */
  static async uploadFile(buffer, filename = null) {
    const { ext, mime } = await Tool.getMimeTypeFromBuffer(buffer);
    const dateFile = cryptoRandomString(7).toLowerCase();
    const defaultFilename = `${
      mime === "image/jpeg" ? `image-${dateFile}` : `video-${dateFile}`
    }.${ext}`;
    const pathExistFile = `./controllers/gemini/api/google/temp/${
      filename ? `${filename}.${ext}` : defaultFilename
    }`;
    await writeFile(pathExistFile, buffer);
    const uploadResponse = await this.fileManager.uploadFile(pathExistFile, {
      mimeType: mime,
      displayName: filename ? filename : defaultFilename,
    });
    return uploadResponse;
  }

  static async listFiles() {
    const listFilesResponse = await this.fileManager.listFiles();
    /**
     * @type { import("@google/generative-ai/files").FileMetadataResponse[] }
     */
    const listFIleInstance = [];
    for (const file of listFilesResponse.files) {
      listFIleInstance.push(file);
    }
    return listFIleInstance;
  }

  /**
   *
   * @param { string } filename
   */
  static async getFile(filename) {
    return await this.fileManager.getFile(filename);
  }

  /**
   *
   * @param { string } filename
   */
  static async deleteFiles(filename) {
    await this.fileManager.deleteFile(filename);
  }
}

module.exports = { GoogleCloudAIFile };
