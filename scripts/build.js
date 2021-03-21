/// @ts-check

const child_process = require('child_process');
const path = require('path');

if (process.platform === 'win32') {
    let proc = child_process.spawn(path.resolve(__dirname, 'build.bat'), { stdio: 'inherit' });
    proc.on('error', err => {
        console.error(`Error: ${err}`);
    });
} else {
    let proc = child_process.spawn(path.resolve(__dirname, 'build.sh'), { stdio: 'inherit' });
    proc.on('error', err => {
        console.error(`Error: ${err}`);
    });
}