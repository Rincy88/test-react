const fs = require('fs');

// Read the first JSON file passed as the first argument
const filePath1 = process.argv[2];
// const fileContents1 = fs.readFileSync(filePath1, 'utf8'); 

//const encodedSbom=btoa(unescape(encodeURIComponent(JSON.stringify(fileContents1)))) 
// const encodedSbom=Buffer.from(fileContents1).toString('base64')

// Write the combined JSON object to a new file
// fs.writeFileSync('converted_file.json', JSON.stringify(encodedSbom, null, 2));
 
const { createReadStream, Transform } = require('stream');

function convertJsonFileToBase64(filePath, callback) {
  const base64EncodedChunks = [];

  const readStream = createReadStream(filePath, { encoding: 'utf8' });
  const base64EncodeStream = new Transform({
    transform(chunk, encoding, callback) {
      const base64EncodedChunk = Buffer.from(chunk).toString('base64');
      this.push(base64EncodedChunk);
      callback();
    },
  });

  readStream.pipe(base64EncodeStream);

  base64EncodeStream.on('data', (chunk) => {
    base64EncodedChunks.push(chunk);
  });

  base64EncodeStream.on('end', () => {
    const base64Encoded = base64EncodedChunks.join('');
    callback(base64Encoded);
  });

  base64EncodeStream.on('error', (error) => {
    console.error('Error encoding file:', error);
  });
}

// Example usage:
// const filePath = 'path/to/your/json/file.json';
convertJsonFileToBase64(filePath1, function (base64Encoded) {
  console.log(base64Encoded); // Base64 encoded content of the JSON file
   fs.writeFileSync('converted_file.json', JSON.stringify(encodedSbom, null, 2));
});
