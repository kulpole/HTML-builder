const fs = require('fs');
const path = require('path');

const absolutePath = path.resolve(__dirname, 'text.txt');

const stream = new fs.ReadStream(absolutePath, {
  encoding: 'utf-8',
});

stream.on('readable', () => {
  let text = stream.read();
  if (text != null) console.log(text);
});
