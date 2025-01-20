const fs = require('fs');
const path = require('path');

const absolutePath = path.resolve(__dirname, 'secret-folder');

fs.readdir(absolutePath, (err, file) => {
  for (let i = 0; i < file.length; i = i + 1) {
    fs.stat(`${absolutePath}\\${file[i]}`, (err, stats) => {
      if (stats.isFile()) {
        console.log(
          `${file[i].split('.')[0]} - ${file[i].split('.')[1]} - ${stats.size}`,
        );
      }
    });
  }
});
