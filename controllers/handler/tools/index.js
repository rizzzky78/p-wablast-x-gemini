const fileType = require("file-type");

class Tool {
  /**
   *
   * @param { "u" | "l" | "n" } c Case
   * @param { Array<string> } d Data input
   * @description
   * - `"u"` are for uppercase, `["abc"] => ["ABC"]`
   * - `"l"` for lowercase, `["ABC"] => ["abc"]`
   * - `"n"` for normal trimmed, `[" a", "b ", "c"] => ["a", "b", "c"]`
   */
  static arrayModifier(c, d) {
    /**
     * @type { { [k: string]: (v: string) => string } }
     */
    const mod = {
      u: (v) => v.trim().toUpperCase(),
      l: (v) => v.trim().toLowerCase(),
      n: (v) => v.trim(),
    };
    const data = d ? d : [""];
    return data.map(mod[c]);
  }

  /**
   *
   * @param { Buffer } buffer
   * @returns { Promise<{ ext: import("file-type/core").FileExtension; mime: import("file-type/core").MimeType }> }
   */
  static async getMimeTypeFromBuffer(buffer) {
    return await fileType.fromBuffer(buffer);
  }
}

module.exports = { Tool };
