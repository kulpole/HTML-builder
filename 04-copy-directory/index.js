const fs = require('fs');
const path = require('path');

const pathFromWhere = path.resolve(__dirname, 'files');
const pathToWhere = path.resolve(__dirname, 'files-copy');

fs.mkdir(pathToWhere, () => {});

fs.readdir(pathToWhere, (err, file) => {
  for (let i = 0; i < file.length; i = i + 1) {
    fs.unlink(`${pathToWhere}\\${file[i]}`, () => {});
  }
});

fs.readdir(pathFromWhere, (err, file) => {
  for (let i = 0; i < file.length; i = i + 1) {
    fs.copyFile(
      `${pathFromWhere}\\${file[i]}`,
      `${pathToWhere}\\${file[i]}`,
      () => {},
    );
  }
});
