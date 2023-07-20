const fs = require('fs');

// Read the first JSON file passed as the first argument
const filePath1 = process.argv[2];
const fileContents1 = fs.readFileSync(filePath1, 'utf8');
const jsonObject1 = JSON.parse(fileContents1);

// Read the second JSON file passed as the second argument
const filePath2 = process.argv[3];
const fileContents2 = fs.readFileSync(filePath2, 'utf8');
const jsonObject2 = JSON.parse(fileContents2);

// Combine the JSON objects
const combinedObject = { ...jsonObject1, ...jsonObject2 };

// Output the combined JSON object
console.log(JSON.stringify(combinedObject, null, 2));

// Write the combined JSON object to a new file
fs.writeFileSync('combined.json', JSON.stringify(combinedObject, null, 2));
