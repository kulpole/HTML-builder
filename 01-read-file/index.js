const fs = require('fs');
const path = require('path');

const absolutePath = path.resolve(__dirname, 'text.txt');

const stream = new fs.ReadStream(absolutePath, {
  encoding: 'utf-8',
});

stream.on('data', (chunk) => {
  console.log(chunk);
});
