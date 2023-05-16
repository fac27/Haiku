const express = require("express");
const { home } = require("./template.js");
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
  const pageBody = /*html*/ `<ul><li>One Haiku</li><li>Two Haiku</li></ul>`; //replace with a callback to templates.js
  res.send(pageBody);
});

// SUBMIT A HAIKU /////////////
server.post("/home", bodyParser, (req, res) => {
  const haiku = req.body.haiku; //review name against templates.js
  const poet = req.body.poet; //review name against templates.js
  const timeStamp = Date.now();

  res.redirect("/read");
});

// exports ////////////////////////
//////////////////////////////////
module.exports = server;
