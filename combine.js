const fs = require('fs');

// Read the first JSON file passed as the first argument
const filePath1 = process.argv[2];
const fileContents1 = fs.readFileSync(filePath1, 'utf8'); 

#const encodedSbom=btoa(unescape(encodeURIComponent(JSON.stringify(fileContents1)))) 
const encodedSbom=Buffer.from(fileContents1).toString('base64')

// Write the combined JSON object to a new file
fs.writeFileSync('converted_file.json', JSON.stringify(encodedSbom, null, 2));
