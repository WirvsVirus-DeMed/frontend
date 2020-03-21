const path = require("path");

module.exports = {
    mode: 'development',
    entry: [
        './temp/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'export'),
        filename: 'bundle.js'
    }
};