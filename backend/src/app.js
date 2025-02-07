const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json()); // middleware for converting incoming JSON data to JS Object

// Sign up API
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

// find One user
app.get("/user", async (req, res) =>{
    try{
        /*const users = await User.find({emailId : req.body.emailId});
        if(users.length === 0){
            res.send("User not found");
        } else{
            res.send(users);
        }*/
        const user = await User.findOne({emailId : req.body.emailId});
        if(!user){
            res.send("User not found");
        } else{
            res.send(user);
        }
    } catch(err){
        res.send("Something went wrong");
    }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) =>{
    try{
        const users = await User.find({});
        if(users.length === 0){
            res.send("User not found");
        } else{
            res.send(users);
        }
    } catch(err){
        res.send("Something went wrong");
    }
});

// Delete an user from the database
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try{
        //const user = await User.findByIdAndDelete(({ _id: userId }));
        const user = await User.findByIdAndDelete(userId);
        if(!user){
            res.send("User not found");
        }else{
            res.send("User deleted successfully");
        }
    } catch(err){
        res.send("Something went wrong");
    }
})

// Update data of the user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body
    try{
        const user = await User.findByIdAndUpdate(userId, data, {returnDocument:'before'});
        if(!user){
            res.send("User not found");
        } else{
            res.send("User updated successfully");
        }
    } catch(err){
        res.send("Something went wrong");
    }
})

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