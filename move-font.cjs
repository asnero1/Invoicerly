const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'public', 'Roboto-Regular.ttf');
const destDir = path.join(__dirname, 'public', 'fonts');
const destPath = path.join(destDir, 'Roboto-Regular.ttf');

if (!fs.existsSync(sourcePath)) {
  console.error('❌ Roboto-Regular.ttf not found in public/');
  process.exit(1);
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
  console.log('📁 Created fonts folder inside public/');
}

fs.rename(sourcePath, destPath, (err) => {
  if (err) {
    console.error('❌ Failed to move file:', err);
  } else {
    console.log('✅ Font successfully moved to public/fonts/Roboto-Regular.ttf');
  }
});
