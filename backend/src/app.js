const express = require('express');

const app = express();

app.use("/", (req, res) => {
    res.send('Hello from dashboard...');
});

app.use("/test", (req, res) => {
    res.send('Hello from Test...');
});

app.use("/hello", (req, res) => {
    res.send('Hellog from Hello Page...');
});

app.listen(3000, () => {
    console.log('Server is listining and running on PORT 3000...');
});