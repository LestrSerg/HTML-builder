const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'output.txt');

const writeStream = fs.createWriteStream(filePath);

console.log('Enter text to write to the file ("exit" or "ctrl + c" to quit):');

process.stdin.on('data', (data) => {
    const input = data.toString().trim();

    if (input.toLowerCase() === 'exit') {
        exitFunc();
        return;
    }
    writeStream.write(input + '\n');
});

process.on('SIGINT', () => {
    exitFunc();
});

function exitFunc() {
    console.log('Goodbye!');
    writeStream.end(); 
    process.exit(); 
}
