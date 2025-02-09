const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const validator = require("validator");
const { validateSignupData } = require("./utlis/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

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
        if(!validator.isEmail(emailId)){
            throw new Error("Email is not valid");
        }

        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }

        const isLoginValid = await bcrypt.compare(password, user.password);

        if(isLoginValid){
            // Create JWT Token
            const token = await jwt.sign(
                { _id: user._id },
                "DEV@Tinder$0225",
                { expiresIn: "1d" }
            );
            //console.log(token);

            // Add the token to cookie and send the response back to the user
            res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000)});

            res.send("Login Successfull!");
        }else{
            throw new Error("Invalid Credentials");
        }

    } catch(err){
        res.send("ERROR: "+ err.message);
    }
});

// Profile
app.get("/profile", userAuth, async (req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    } catch (err){
        res.send("ERROR: "+ err.message);
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