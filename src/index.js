const { analyzeDocument } = require('./analyzeDocument');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data', 'Decreto-20_29-SEP-2011.pdf');

async function main() {
  try {
    console.log("Starting document analysis...");
    const result = await analyzeDocument(filePath);

    const outputDir = path.join(__dirname, '../output');
    const outputPath = path.join(outputDir, 'results.json');

    // Verificar si la carpeta 'output' existe, si no, crearla
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    console.log('Results saved to', outputPath);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
