const express = require("express");
const { home } = require("./template.js"); 
const { haikuBoard } = require("./template.js");
const server = express();
const bodyParser = express.urlencoded();

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

server.post("/home", bodyParser, (req, res) => {
  const haiku = req.body.haiku; //review name against templates.js
  const poet = req.body.poet; //review name against templates.js
  const timeStamp = Date.now();

  haikus.push({ haiku, poet, timeStamp })

  res.redirect("/read");
});

// exports ////////////////////////
//////////////////////////////////
module.exports = server;
