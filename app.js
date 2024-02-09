
const express = require('express');
require('dotenv').config()
const authRoutes = require('./routes/auth');
const { connectDb } = require('./connection/mongodb');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());
connectDb();

app.use('/auth', authRoutes);
app.use('/result', require('./routes/result'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});