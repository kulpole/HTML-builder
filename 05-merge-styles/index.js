const fs = require('fs');
const path = require('path');
const absolutePath = path.resolve(__dirname, 'project-dist\\bundle.css');
const pathFromWhere = path.resolve(__dirname, 'styles');

fs.unlink(absolutePath, () => {});

fs.readdir(pathFromWhere, (err, file) => {
  for (let i = 0; i < file.length; i = i + 1) {
    if (path.extname(`${pathFromWhere}\\${file[i]}`) === '.css') {
      const stream = new fs.ReadStream(`${pathFromWhere}\\${file[i]}`, {
        encoding: 'utf-8',
      });
      stream.on('readable', () => {
        let text = stream.read();
        if (text !== null) {
          fs.appendFile(absolutePath, text, () => {});
        }
      });
    }
  }
});
