const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect(
        "mongodb+srv://sadcat14:KHkOwhsZfJi0z9Wv@namastenode.a4bbu.mongodb.net/devTinder"
    );
};

module.exports = {connectDB};