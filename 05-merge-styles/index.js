const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'styles');
const outDir = path.join(__dirname, 'project-dist');
const bundleFl = path.join(outDir, 'bundle.css');


fs.mkdir(outDir, { recursive: true }, (err) => {
    if (err) {
        console.error('Error creating directory:', err);
        return;
    }

    fs.readdir(cssDir, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        const cssFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.isFile() && path.extname(file.name) === '.css') {
                cssFiles.push(file.name);
            }
        }
        fs.writeFile(bundleFl, '', (err) => {
            if (err) {
                console.error('Error clearing file:', err);
                return;
            }

            for (let i = 0; i < cssFiles.length; i++) {
                const filePath = path.join(cssDir, cssFiles[i]);

                fs.readFile(filePath, 'utf-8', (err, data) => {
                    if (err) {
                        console.error('Error reading file:', filePath, err);
                        return;
                    }

                    fs.appendFile(bundleFl, data + '\n', (err) => {
                        if (err) {
                            console.error('Error appending to file:', err);
                        }
                    });
                });
            }
        });
    });
});
