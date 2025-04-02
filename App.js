require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");


//mongoose connection
const mongoose = require("mongoose");
const userModel = require("./models/user-model");
const path = require("path");
const db = require("./config/mongoose-connection");

// Server
const http = require("http");
const server = http.createServer(app); //Server Created

//Routes
const user = require("./routes/user-route");
//views
app.set("view engine", "ejs");

//Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", user);


//server listening 
app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:3000');
});
