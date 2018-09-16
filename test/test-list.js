const handler = require('../index');

const callback = (error, result) => {
    console.log(`Error: ${error}`);
    console.log(`Result: ${result}`);
}

handler.listHandler({}, null, callback);
