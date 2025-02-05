const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user")


app.post("/signup", async (req,res) => {
    const user = new User({
        firstName: "Sachin",
        lastName: "Tendulker",
        emailId: "virat@gmail.com",
        password: "Sachin@879"
    });

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