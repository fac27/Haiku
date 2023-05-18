const express = require("express");
const server = express();
const bodyParser = express.urlencoded({ extended: true });
server.use(express.static("public"));

const { home, haikuBoard } = require("./template.js");
const { isValidData } = require("../utils/validate.js");
const { sanitise } = require("../utils/sanitise.js");

// ROUTES //////////////////////////


// HOME PAGE ////////////////////

server.get("/", (req, res) => {
  const pageBody = home({}, {});
  res.send(pageBody);
});

// VIEW SUBMITIONS /////////////
server.get("/read", (req, res) => {
  const pageBody = haikuBoard(haikus);
  res.send(pageBody);
});

// SUBMIT A HAIKU /////////////
const haikus = [];
let count = 0;

server.post("/post", bodyParser, (req, res) => {
  const errors = {};
  const haiku = sanitise(req.body.haiku);
  const poet = sanitise(req.body.poet);
  const date = new Date();
  const timeStamp = date.toLocaleString("en-GB");
  const id = count;
  count += 1;

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
  const index = haikus.findIndex((haiku) => haiku.id === id);
  if (index !== -1) {
    haikus.splice(index, 1);
  }
  res.redirect("/read");
});

// EXPORTS ////////////////////////

module.exports = server;
