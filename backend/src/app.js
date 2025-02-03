const express = require('express');

const app = express();

app.get("/user", (req, res) => {
    res.send({"firstname": "Saptak", "lastname" : "Das"})
});

app.listen(7777, () => {
    console.log('Server is listining and running on PORT 7777...');
});