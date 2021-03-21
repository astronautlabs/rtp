/// @ts-check

const child_process = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.platform === 'win32') {
    let proc = child_process.spawn(path.resolve(__dirname, 'build.bat'), { stdio: 'inherit' });
    proc.on('error', err => {
        console.error(`Error: ${err}`);
    });
} else {
    let buildScript = path.resolve(__dirname, 'build.sh');
    // i can't believe this is required ugh
    // when publishing a package from Windows, the line endings will be CRLF
    // and bash barfs on this...
        
    fs.writeFileSync(buildScript, fs.readFileSync(buildScript).toString('utf-8').replace(/\r\n/g, "\n"));
    fs.chmodSync(buildScript, 0o755);

    let proc = child_process.spawn(buildScript, { stdio: 'inherit' });
    proc.on('error', err => {
        console.error(`Error: ${err}`);
    });
}