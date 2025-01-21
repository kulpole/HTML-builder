const fs = require('fs');
const path = require('path');
const readline = require('readline');
let templateLines = [];
let indexLines = [];
let dataHeader = '';
let dataArticles = '';
let dataFooter = '';
let dataIndex = '';

const absolutePath = path.resolve(__dirname, 'project-dist');

fs.unlink(absolutePath, () => {});

async function createDirsWithFiles() {
  const files = await fs.promises.readdir(__dirname);
  if (!files.includes('project-dist')) {
    await fs.promises.mkdir(absolutePath);
  }

  const distFiles = await fs.promises.readdir(absolutePath);
  if (!distFiles.includes('assets')) {
    await fs.promises.mkdir(path.join(absolutePath, 'assets'));
  }

  const assetFiles = await fs.promises.readdir(
    path.join(absolutePath, 'assets'),
  );
  if (!assetFiles.includes('fonts')) {
    await fs.promises.mkdir(path.join(absolutePath, 'assets', 'fonts'));
  }

  if (!assetFiles.includes('img')) {
    await fs.promises.mkdir(path.join(absolutePath, 'assets', 'img'));
  }

  if (!assetFiles.includes('svg')) {
    await fs.promises.mkdir(path.join(absolutePath, 'assets', 'svg'));
  }

  fs.readdir(`${__dirname}\\assets\\fonts`, (err, file) => {
    for (let i = 0; i < file.length; i = i + 1) {
      fs.copyFile(
        `${__dirname}\\assets\\fonts\\${file[i]}`,
        `${absolutePath}\\assets\\fonts\\${file[i]}`,
        () => {},
      );
    }
  });

  fs.readdir(`${__dirname}\\assets\\img`, (err, file) => {
    for (let i = 0; i < file.length; i = i + 1) {
      fs.copyFile(
        `${__dirname}\\assets\\img\\${file[i]}`,
        `${absolutePath}\\assets\\img\\${file[i]}`,
        () => {},
      );
    }
  });

  fs.readdir(`${__dirname}\\assets\\svg`, (err, file) => {
    for (let i = 0; i < file.length; i = i + 1) {
      fs.copyFile(
        `${__dirname}\\assets\\svg\\${file[i]}`,
        `${absolutePath}\\assets\\svg\\${file[i]}`,
        () => {},
      );
    }
  });
}

createDirsWithFiles();

async function writeData() {
  dataHeader = await fs.promises.readFile(
    `${__dirname}\\components\\header.html`,
    'utf-8',
  );
  dataArticles = await fs.promises.readFile(
    `${__dirname}\\components\\articles.html`,
    'utf-8',
  );
  dataFooter = await fs.promises.readFile(
    `${__dirname}\\components\\footer.html`,
    'utf-8',
  );

  const stream = new fs.ReadStream(`${__dirname}\\template.html`, {
    encoding: 'utf-8',
  });

  const rl = readline.createInterface({
    input: stream,
  });

  rl.on('line', (line) => {
    templateLines.push(line);
  });

  rl.on('close', () => {
    for (let i = 0; i < templateLines.length; i = i + 1) {
      if (templateLines[i] === '    {{header}}') {
        indexLines.push(dataHeader);
      }
      if (templateLines[i] === '    <main class="main">{{articles}}</main>') {
        indexLines.push(`<main class="main">\n${dataArticles}</main>\n`);
      }
      if (templateLines[i] === '    {{footer}}') {
        indexLines.push(dataFooter);
      }
      if (
        templateLines[i] !== '    {{header}}' &&
        templateLines[i] !== '    <main class="main">{{articles}}</main>' &&
        templateLines[i] !== '    {{footer}}'
      ) {
        indexLines.push(`${templateLines[i]}\n`);
      }
    }
    dataIndex = indexLines.join('');

    fs.writeFile(`${absolutePath}\\index.html`, dataIndex, () => {});
  });
}

writeData();

fs.readdir(`${__dirname}\\styles`, (err, file) => {
  for (let i = 0; i < file.length; i = i + 1) {
    if (path.extname(`${__dirname}\\styles\\${file[i]}`) === '.css') {
      const stream = new fs.ReadStream(`${__dirname}\\styles\\${file[i]}`, {
        encoding: 'utf-8',
      });
      stream.on('readable', () => {
        let text = stream.read();
        if (text !== null) {
          fs.appendFile(`${absolutePath}\\style.css`, text, () => {});
        }
      });
    }
  }
});
