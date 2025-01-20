const fs = require('fs');
const path = require('path');

const sfolder = path.join(__dirname, 'secret-folder');

fs.readdir(sfolder, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.error('Error reading the directory:', err.message);
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.isFile()) {
            const fpath = path.join(sfolder, file.name);

            fs.stat(fpath, (err, stats) => {
                if (err) {
                    console.error(`Error getting stats for ${file.name}:`, err.message);
                    return;
                }

                const fname = path.parse(file.name).name;
                const fext = path.parse(file.name).ext.slice(1);
                console.log(`${fname} - ${fext} - ${(stats.size / 1000).toFixed(3)}kb`);

            });
        }
    }
});