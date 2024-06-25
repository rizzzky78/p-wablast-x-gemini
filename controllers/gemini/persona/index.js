const { readFileSync, writeFileSync } = require("fs");

class Persona {
  static statePersona() {
    /**
     * @type { { persona: "origin" | "mod" } }
     */
    const state = JSON.parse(
      readFileSync("./controllers/gemini/persona/switcher.json", "utf-8")
    );
    return state.persona === "origin" ? `origin` : `dynamic`;
  }

  static getPersona() {
    return readFileSync(
      `./controllers/gemini/persona/${this.statePersona()}-persona.txt`,
      "utf-8"
    );
  }

  static switchPersona() {
    /**
     * @type { { persona: "origin" | "mod" } }
     */
    const state = JSON.parse(
      readFileSync("./controllers/gemini/persona/switcher.json", "utf-8")
    );
    writeFileSync(
      "./controllers/gemini/persona/switcher.json",
      JSON.stringify({ persona: state.persona === "origin" ? `mod` : `origin` })
    );
  }

  /**
   *
   * @param { string } args
   */
  static setPersona(args) {
    writeFileSync(
      `./controllers/gemini/persona/dynamic-persona.txt`,
      args.trim()
    );
  }
}

module.exports = { Persona };
