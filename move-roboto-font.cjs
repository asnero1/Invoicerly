const fs = require('fs')
const path = require('path')

const source = 'C:/Users/asner/Downloads/Roboto/static/Roboto-Regular.ttf'
const destination = path.join(
  __dirname,
  'public',
  'fonts',
  'Roboto-Regular.ttf'
)

fs.copyFile(source, destination, (err) => {
  if (err) {
    console.error('❌ Failed to copy font:', err)
  } else {
    console.log('✅ Font copied to public/fonts')
  }
})
