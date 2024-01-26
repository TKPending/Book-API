require("dotenv").config();
const express = require('express');
const app = express();
const router = require("./routes/bookRoutes");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB - Bootcamp Database!");
}).catch(() => console.log("Error connecting to MongoDB! - Check MONGO_URI"));

app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
    res.send('Welcome!');
});

// Connect to server
app.listen(3000, () => {
    console.log("Server Activated!");
})