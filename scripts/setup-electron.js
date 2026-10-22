const extract = require('extract-zip');
const path = require('path');
const fs = require('fs');

const zip = 'C:/Users/hp/AppData/Local/electron/Cache/073c10f139c87e3badb3ab4fec283ab33ea3ccf18b5cb8ce88ffcc6cb893b618/electron-v34.5.8-win32-x64.zip';
const distDir = path.resolve(__dirname, '../node_modules/electron/dist');
const pathTxt = path.resolve(__dirname, '../node_modules/electron/path.txt');

async function main() {
  console.log('Extracting from:', zip);
  console.log('Extracting to:', distDir);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  await extract(zip, { dir: distDir });
  fs.writeFileSync(pathTxt, 'electron.exe');
  console.log('Extraction complete! path.txt written.');
}

main().catch(err => {
  console.error('Extraction failed:', err);
  process.exit(1);
});
