const express = require("express");

const app = express();

app.get('/' , (req, res) => res.send("Hey "));

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server is running on ${port}`));
