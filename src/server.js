const express = require("express");
const { home, haikuBoard, isValidData, sanitise } = require("./template.js");
const server = express();
const bodyParser = express.urlencoded({ extended: true });
server.use(express.static("public"));

// routes //////////////////////////
///////////////////////////////////

// HOME PAGE ////////////////////
server.get("/home", (req, res) => {
  const pageBody = home({}, {});
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
let count = 0;

server.post("/home", bodyParser, (req, res) => {
  const haiku = sanitise(req.body.haiku);
  const poet = sanitise(req.body.poet);
  const date = new Date();
  const timeStamp = date.toLocaleString("en-GB");
  const id = count;
  count += 1;

  errors.haiku = "";
  errors.poet = "";

  if (isValidData(haiku) && isValidData(poet)) {
    haikus.push({ haiku, poet, timeStamp, id });
    res.redirect("/read");
  } else {
    if (!isValidData(haiku)) errors.haiku = "Field cannot be empty";
    if (!isValidData(poet)) errors.poet = "Field cannot be empty";
    res.send(home(errors, { haiku, poet }));
  }
});

// DELETE A HAIKU /////////////

server.post("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = haikus.findIndex(haiku => haiku.id === id)
  if (index !== -1) {
    haikus.splice(index,1);
  }
  res.redirect("/read");
})


// exports ////////////////////////
//////////////////////////////////
module.exports = server;
