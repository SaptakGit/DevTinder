const express = require('express');
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");


// Setting Cors and Whitelisting the Domain Name for set coockie
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json()); // middleware for converting incoming JSON data to JS Object
app.use(cookieParser()); // middlewarre for reading cookies

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require('./routes/user');

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(7777, () => {
            console.log('Server is listining and running on PORT 7777...');
        });
    })
    .catch((err) => {
        console.error("Database connot be connected!!!")
    });