import mongoose from "mongoose";
import express from 'express';
import bodyParser from "body-parser";
import logger from "morgan";
import utils from "./helpers/utils.js";
import path from "path";
import dotenv from "dotenv";
import Routes from "./routes/platform";

global.path = path;
global.dotenv = dotenv;
// this is our MongoDB database
const dbRoute = require("./config");
var port=Number(process.env.PORT || 3000);

// connects our back end code with the database
mongoose.connect(
    dbRoute.mongoUrl,
    { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

utils.loadENV();
const app = express();

app.use(express.static(path.resolve(process.cwd(), 'public')));
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use('/api', Routes);
/*handling requests not in express*/
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'./../../public/index.html'));
});
app.listen(port, () => {
    utils.log(`Server has started and is listening on port ${port}!`)
});