
const mongoose = require("mongoose");

exports.connectDb = async () => {
    try {
        const data = await mongoose.connect("mongodb+srv://aksapple1610:DLTest@dl.qxgye6d.mongodb.net/Learners");
        console.log("Connected to mongoDb");
    } catch (error) {
        console.log("An error occoured in connecting mongoDb", error);
    }
};
