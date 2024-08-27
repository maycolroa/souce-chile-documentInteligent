const { DocumentAnalysisClient, AzureKeyCredential } = require('@azure/ai-form-recognizer');
const fs = require('fs');
const path = require('path');
const { key, endpoint } = require('./config');

async function analyzeDocument(filePath) {
  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

  // Leer el archivo localmente
  const fileStream = fs.createReadStream(filePath);

  const poller = await client.beginAnalyzeDocument("prebuilt-layout", fileStream, {
    contentType: "application/pdf"
  });

  const analyzeResult = await poller.pollUntilDone();

  const pages = analyzeResult.pages;

  if (!pages || pages.length === 0) {
    throw new Error("Expected at least one page in the result.");
  }

  const result = {
    pages: []
  };

  for (const page of pages) {
    const pageData = {
      pageNumber: page.pageNumber,
      // Elimina 'confidence' si es undefined
      ...(page.confidence !== undefined && { confidence: page.confidence }),
      lines: []
    };

    for (const line of page.lines) {
      const lineData = {
        content: line.content,
        // Elimina 'confidence' si es undefined
        ...(line.confidence !== undefined && { confidence: line.confidence })
      };

      pageData.lines.push(lineData);
    }

    result.pages.push(pageData);
  }

  return result;
}

module.exports = { analyzeDocument };
