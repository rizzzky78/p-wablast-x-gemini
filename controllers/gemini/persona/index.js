const { readFileSync, writeFileSync } = require("fs");

class Persona {
  /**
   *
   * @returns { "origin" | "mod" }
   */
  static statePersona() {
    /**
     * @type { { persona: "origin" | "mod" } }
     */
    const state = JSON.parse(
      readFileSync("./controllers/gemini/persona/switcher.json", "utf-8")
    );
    return state.persona === "origin" ? `origin` : `dynamic`;
  }

  static async getPersona() {
    return {
      current: this.statePersona(),
      persona: readFileSync(
        `./controllers/gemini/persona/${this.statePersona()}-persona.txt`,
        "utf-8"
      ),
    };
  }

  /**
   *
   * @returns { "origin" | "mod" }
   */
  static async switchPersona() {
    /**
     * @type { { persona: "origin" | "mod" } }
     */
    const state = JSON.parse(
      readFileSync("./controllers/gemini/persona/switcher.json", "utf-8")
    );
    writeFileSync(
      "./controllers/gemini/persona/switcher.json",
      JSON.stringify(
        { persona: state.persona === "origin" ? `mod` : `origin` },
        null,
        2
      )
    );
    return state.persona === "origin" ? "mod" : "origin";
  }

  /**
   *
   * @param { string } args
   */
  static async setPersona(args) {
    writeFileSync(
      `./controllers/gemini/persona/dynamic-persona.txt`,
      args.trim()
    );
    return args.trim();
  }
}

module.exports = { Persona };
