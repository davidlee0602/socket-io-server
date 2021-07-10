const path = require('path');
const express = require('express');
const publicPath  = path.join(__dirname, '/../public');

const dotenv = require('dotenv');
const app = express();

const port = process.env.PORT || 4000;


app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Communication Server started in port: ${port}`);

})