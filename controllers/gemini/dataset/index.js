const { readFileSync, writeFileSync } = require("fs");
const { quickMessage } = require("../msg-info");

const staticData = readFileSync(
  "./controllers/gemini/dataset/general.information.txt",
  "utf-8"
);

/**
 *
 * @param { string } username
 * @param { string } dataset
 */
function formatInjectableData(username, dataset = null) {
  const data =
    `My Username is: ${username}\n\n` +
    `${staticData}\n\n` +
    `${dataset ? dataset : ""}\n\n` +
    `Wait until next instructions.`;
  return data;
}

class Dataset {
  /**
   *
   * @param { string } username
   * @returns
   */
  static injectInitialData(username = null) {
    return [
      {
        role: "user",
        parts: [
          {
            text: formatInjectableData(username),
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `Understood, please let me know the next instructions or any specific details you need further analyzed or processed from this data.`,
          },
        ],
      },
    ];
  }

  /**
   *
   * @param { string } prompt
   * @param { string } visionResponseText
   */
  static injectVisionResponse(prompt, visionResponseText) {
    return [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: visionResponseText,
          },
        ],
      },
    ];
  }

  static async getCurrentDataset() {
    return staticData ? staticData : quickMessage("dataset_empty");
  }

  /**
   *
   * @param { string } dataset
   */
  static async updateDataset(dataset) {
    writeFileSync(
      "./controllers/gemini/dataset/general.information.txt",
      dataset.trim()
    );
    return dataset.trim()
  }
}

module.exports = { Dataset };
