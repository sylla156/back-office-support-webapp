const express = require('express');
const path = require('path');
const config = require('./config.json');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log("Will start the server.", config.appPort);
app.listen(config.appPort);