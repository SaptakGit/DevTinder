const express = require('express');

const app = express();

app.use("/test", (req, res) => {
    res.send('Hello from Test...');
});

app.get("/user", (rreq, res) => {
    res.send({"firstname": "Saptak", "lastname" : "Das"})
});

app.post("/user", (rreq, res) => {
    res.send("Data saved successfully to the database")
});

app.delete("/user", (req, res) => {
    res.send("User deleted suceesfully")
})

app.listen(7777, () => {
    console.log('Server is listining and running on PORT 7777...');
});