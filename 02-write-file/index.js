const fs = require('fs');
const path = require('path');
const readline = require('readline');
const absolutePath = path.resolve(__dirname, 'newFile.txt');
let text = '';
let hasText = false;

fs.readFile(absolutePath, 'utf-8', (err, data) => {
  if (err) return;
  if (data.length > 0) {
    hasText = true;
  }
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.write('enter the text\n');

rl.on('SIGINT', () => {
  console.log('you exit');
  rl.close();
  process.exit(0);
});

rl.on('line', function (inputText) {
  if (inputText === 'exit') {
    console.log('you exit');
    rl.close();
    process.exit(0);
  }

  if (hasText) {
    text = '\n' + inputText;
  } else text = inputText;
  hasText = true;
  fs.appendFile(absolutePath, text, () => {});
});
