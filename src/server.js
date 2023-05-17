const express = require("express");
const { home, haikuBoard, isValidData, sanitise } = require("./template.js");
const server = express();
const bodyParser = express.urlencoded();
server.use(express.static("public"));

// routes //////////////////////////
///////////////////////////////////

// HOME PAGE ////////////////////
server.get("/home", (req, res) => {
  const pageBody = home();
  res.send(pageBody);
});

server.get("/", (req, res) => {
  res.redirect("/home");
});

// VIEW SUBMITIONS /////////////
server.get("/read", (req, res) => {
  const pageBody = haikuBoard(haikus); //replace with a callback to templates.js
  res.send(pageBody);
});

// SUBMIT A HAIKU /////////////
const haikus = [];
const errors = {};

server.post("/home", bodyParser, (req, res) => {
  const haiku = sanitise(req.body.haiku);
  const poet = sanitise(req.body.poet);
  const timeStamp = Date.now();

  if (isValidData(haiku) && isValidData(poet)) {
    haikus.push({ haiku, poet, timeStamp });
    res.redirect("/read");
  } else {
    if (!isValidData(haiku)) errors.haiku = "Field cannot be empty";
    if (!isValidData(poet)) errors.poet = "Field cannot be empty";
    res.send(home(errors));
  }
});

// exports ////////////////////////
//////////////////////////////////
module.exports = server;
