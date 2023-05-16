const express = require("express");
// const { homePage } = require("./templates.js"); // this line is assuming a path to templates.js and requiring the code exported by Beth & Simon
const server = express();
const bodyParser = express.urlencoded();

// routes //////////////////////////
///////////////////////////////////

// HOME PAGE ////////////////////
server.get("/home", (req, res) => {
  const pageBody = /*html*/ `<h1>Haiku</h1>`; //replace with a callback to templates.js
  res.send(pageBody);
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

  res.redirect("/home");
});

// exports ////////////////////////
//////////////////////////////////
module.exports = server;
