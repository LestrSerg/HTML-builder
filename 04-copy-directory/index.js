const fs = require('fs');
const path = require('path');

function copyDirectory() {

	const source = path.join(__dirname, 'files');
	const dest = path.join(__dirname, 'files-copy');

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
        	    	copyDirectory(sourcePath, destPath);
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


copyDirectory();