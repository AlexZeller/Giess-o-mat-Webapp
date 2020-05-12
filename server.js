const express = require('express');
const path = require('path')
const distPath = path.resolve(__dirname, 'dist')
let app = express();
app.use(express.static(distPath));
app.listen(8080);
console.log('server is running on port 8080');