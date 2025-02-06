const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json()); // middleware for converting incoming JSON data to JS Object


app.post("/signup", async (req,res) => {
    //console.log(req.body);
    const user = new User(req.body);

    try{
        await user.save();
        res.send("User added successfully!!");
    } catch (err){
        res.status(400).send("Error saving user"+ err.message);
    }
});


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