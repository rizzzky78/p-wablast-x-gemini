const { readFileSync } = require("fs");

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
            text:
              `My Username is: ${username}\n\n` +
              readFileSync("./assets/data/general-information.txt", "utf-8"),
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
}

module.exports = { Dataset };
