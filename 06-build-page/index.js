const fs = require('fs');
const path = require('path');

const prjDir = path.join(__dirname, 'project-dist');
const templFile = path.join(__dirname, 'template.html');
const compDir = path.join(__dirname, 'components');
const cssDir = path.join(__dirname, 'styles');
const assetsDir = path.join(__dirname, 'assets');
const outAssets = path.join(prjDir, 'assets');
const outCSS = path.join(prjDir, 'style.css');


fs.mkdir(prjDir, { recursive: true }, (err) => {
    if (err) throw err;

    fs.readFile(templFile, 'utf-8', (err, templData) => {
        if (err) throw err;

        let templCont = templData;

        fs.readdir(compDir, (err, files) => {
            if (err) throw err;

            let completed = 0;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const ext = path.extname(file);
                const name = path.basename(file, ext);

                if (ext === '.html') {
                    const compPath = path.join(compDir, file);
                    fs.readFile(compPath, 'utf-8', (err, compData) => {
                        if (err) throw err;

                        const tag = `{{${name}}}`;
                        templCont = templCont.replace(tag, compData);

                        completed++;
                        if (completed === files.length) {
                            const outFile = path.join(prjDir, 'index.html');
                            fs.writeFile(outFile, templCont, (err) => {
                                if (err) throw err;
                            });
                        }
                    });
                } else {
                    completed++;
                }
            }
        });
    });

    fs.readdir(cssDir, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error('Error reading css directory:', err);
            return;
        }

        const cssFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.isFile() && path.extname(file.name) === '.css') {
                cssFiles.push(file.name);
            }
        }

        fs.writeFile(outCSS, '', (err) => {
            if (err) {
                console.error('Error clearing css file:', err);
                return;
            }
            for (let i = 0; i < cssFiles.length; i++) {
                const filePath = path.join(cssDir, cssFiles[i]);

                fs.readFile(filePath, 'utf-8', (err, data) => {
                    if (err) {
                        console.error('Error reading css file:', filePath, err);
                        return;
                    }
                    fs.appendFile(outCSS, data + '\n', (err) => {
                        if (err) {                                                                            	
                            console.error('Error appending to css file:', err);
                        }
                    });

                });
            }
        });
    });

	function copyAssets(source, dest) {

		fs.mkdir(dest, { recursive: true }, (err) => {
			if (err) {
    			console.error(`Error creating directory ${dest}:`, err);
        		return;
	        	}

	    	    fs.readdir(source, { withFileTypes: true }, (err, files) => {
    	    	if (err) {
        	    	 console.error(`Error reading directory ${source}:`, err);
            	 	return;
		        }
	
    		    for (let i = 0; i < files.length; i++) {
	    		    const file = files[i];
					const sourcePath = path.join(source, file.name);
					const destPath = path.join(dest, file.name);
	

    		    	if (file.isDirectory()) {
        		    	copyAssets(sourcePath, destPath);
            		} else if (file.isFile()) {
           				fs.copyFile(sourcePath, destPath, (err) => {
    						if (err) {
				    			console.log("Error found:", err);
				
		    				} else {
								console.log(`Copied file: ${sourcePath} to ${destPath}`);						
							}

            			});
					}
	    		};
			});
		});
	}

    copyAssets(assetsDir, outAssets);
});
