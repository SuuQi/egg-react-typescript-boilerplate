const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
// const bashFiles = [
//     path.join(__dirname, '../docker/root/bootstrap.sh'),
//     path.join(__dirname, '../yaml-to-json.js')
// ];
// const CRLF_REG = /\r\n/;

// bashFiles.forEach(file => {
//     if (CRLF_REG.test(fs.readFileSync(file, 'utf8'))) {
//         throw new Error('文件：' + file + ' 中换行符为CRLF，请替换为LF');
//         process.exit();
//     }
// });

shell.cd(path.join(__dirname, '../'));
shell.rm('-rf', 'dist/client');
shell.mkdir('-p', 'dist/client/public/assets');
shell.cp('-R', 'client/assets', 'dist/client/public');
shell.cp('package*.json', 'dist');
// shell.cp('yaml-to-json.js', 'dist/yaml-to-json.js');
