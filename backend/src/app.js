const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const validator = require("validator");
const { validateSignupData } = require("./utlis/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

app.use(express.json()); // middleware for converting incoming JSON data to JS Object
app.use(cookieParser()); // middlewarre for reading cookies

// Sign up API
app.post("/signup", async (req,res) => {
    //console.log(req.body);
    try{
        // Validation of data 
        validateSignupData(req);

        //Encrypt the password
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        // Creating a new Instance of the User Model
        const user = new User({
            firstName : firstName, 
            lastName : lastName, 
            emailId : emailId, 
            password : passwordHash
        });
        await user.save();
        res.send("User added successfully!!");
    } catch (err){
        res.status(400).send("ERROR: "+ err.message);
    }
});

// Login API
app.post("/login", async (req,res) => {
    try{
        const { emailId, password } = req.body;
        /*if(!validator.isEmail(emailId)){
            throw new Error("Email is not valid");
        }*/

        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }

        const isLoginValid = await bcrypt.compare(password, user.password);

        if(isLoginValid){
            // Create JWT Token


            // Add the token to cookie and send the response back to the user
            res.cookie("token", "sdsfhosfhdoisdfw98572985723vnsfjdhbb7vhsd4+6g4fg4");

            res.send("Login Successfull!");
        }else{
            throw new Error("Invalid Credentials");
        }

    } catch(err){
        res.send("ERROR: "+ err.message);
    }
});

// Profile
app.get("/profile", (req,res)=>{
    const cookies = req.cookies;
    console.log(cookies);
    res.send("Reading cookie");
})

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
app.patch("/user/:userId", async (req, res) => {
    //const userId = req.body.userId;
    const userId = req.params?.userId;
    const data = req.body

    try{

        const ALLOWED_UPDATES = [
            "photoUrl", 
            "about", 
            "gender", 
            "age", 
            "skills"
        ]
    
        const isUpdateAlowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdateAlowed){
            throw new Error("Update not allowed");
        }

        if(data?.skills.length > 10){
            throw new Error("Upto 10 skills allowed");
        }

        const user = await User.findByIdAndUpdate(userId, data, {
            returnDocument:'before',
            runValidators: true
        });
        if(!user){
            res.send("User not found");
        } else{
            res.send("User updated successfully");
        }
    } catch(err){
        res.send("UPDATE FALIS: "+err.message);
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