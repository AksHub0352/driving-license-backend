
const mongoose = require("mongoose");

exports.connectDb = async () => {
    try {
        const data = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to mongoDb");
    } catch (error) {
        console.log("An error occoured in connecting mongoDb", error);
    }
};
