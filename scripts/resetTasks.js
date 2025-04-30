const fs = require('fs');
const path = require('path');

const tasksPath = path.join(__dirname, '..', 'data', 'tasks.json');

console.log('🧹 Resetting file:', tasksPath);

// ✅ Force overwrite
fs.writeFileSync(tasksPath, '[]', { encoding: 'utf8', flag: 'w' });

console.log('✅ tasks.json has been reset to an empty array.');
