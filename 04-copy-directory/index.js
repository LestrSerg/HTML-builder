const fs = require('fs');
const path = require('path');

async function copyDirectory() {

	const source = path.join(__dirname, 'files');
	const dest = path.join(__dirname, 'files-copy');


	await fs.promises.rm(dest, { recursive: true, force: true });

	
	fs.mkdir(dest, { recursive: true, }, (err) => {
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
       	    		continue;
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