const express = require('express');

const app = express();

// Using Wild Card Error Handling
app.get("/getUserData", (req, res) => {
    throw new Error("server not found");
    res.send("User Data Sent");
});


// Using Try/Catch Error Handling
app.get("/getUser", (req, res) => {
    try{
        throw new Error("server not found");
        res.send("User Data Sent");
    } catch(err){
        // log the error
        res.status(500).send("Some Error Occur");
    }
    
});

// Keep Wildcard Error towards the End
app.use("/", (err, req, res, next) => {
    if(err){
        // log the error
        res.status(500).send("Something Went Wrong");
    }
});

app.listen(7777, () => {
    console.log('Server is listining and running on PORT 7777...');
});