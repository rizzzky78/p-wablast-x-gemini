const { PDFDocument } = require("pdf-lib");
const pdf = require("pdf-parse");

class Remote {
  /**
   *
   * @param { Buffer } bufferPdf
   * @returns
   */
  static async extractTextFromPDF(bufferPdf) {
    const pdfDoc = await PDFDocument.load(bufferPdf);
    const pages = pdfDoc.getPages();
    const data = await pdf(bufferPdf);
    console.log("Extracted Text:\n", data.text);
    // Example of accessing the number of pages and other metadata
    console.log(`Number of pages: ${data.numpages}`);
    console.log(`Info:`, data.info);

    return {
      text: data.text,
      pages: data.numpages,
      metadata: data.metadata,
    };
  }
}

module.exports = { Remote };
