// scripts/download-font.cjs

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const FONT_URL =
  'https://raw.githubusercontent.com/google/fonts/main/apache/roboto/Roboto-Regular.ttf';
const OUTPUT_DIR = path.join(__dirname, '../assets/fonts');
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'Roboto-Regular.ttf');

async function downloadFont() {
  try {
    console.log('⬇️ Downloading Roboto font...');

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const response = await fetch(FONT_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    if (!response.ok) {
      throw new Error(`Failed to download. Status code: ${response.status}`);
    }

    const buffer = await response.buffer();
    fs.writeFileSync(OUTPUT_PATH, buffer);

    console.log('✅ Roboto font downloaded successfully!');
  } catch (error) {
    console.error('❌', error.message);
  }
}

downloadFont();
