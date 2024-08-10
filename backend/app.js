const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const router = require('./routes/Router');
const bodyParser = require('body-parser');
const connectDB = require('./db/connect.js');
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use('/', router);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('DB connected');
        app.listen(port, console.log(`Server Active: ${port}`));
    } catch (err) {
        console.log(err);
    }
};

start();