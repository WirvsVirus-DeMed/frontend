const path = require("path");

module.exports = {
    mode: 'development',
    entry: [
        './temp/src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'export'),
        filename: 'bundle.js'
    }
};