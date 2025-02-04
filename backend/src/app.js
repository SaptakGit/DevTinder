const express = require('express');

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/user/login",(req, res) => {
    res.send("User Logged in Successfully!")
}) // Middleware NOT Checked 

app.get("/user",userAuth, (req, res) => {
    res.send("User Data Sent")
}) // Middleware For User Checked 

app.get("/admin/getAllUser", (req, res) => {
    res.send("All Data Sent")
}) // Middleware For Admin Checked

 app.get("/admin/deleteUser", (req, res) => {
    res.send("User Deleted")
}) // Middleware For Admin Checked

app.listen(7777, () => {
    console.log('Server is listining and running on PORT 7777...');
});