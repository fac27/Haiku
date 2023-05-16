const test = require("node:test");
const assert = require("node:assert");
const { home } = require("../src/template.js"); 
const server = require("../src/server.js")

test("GET '/home' takes user to the home page", async () => {
  const app = server.listen(9876);
  const response = await fetch("http://localhost:9876");
  app.close();

  assert.equal(response.status, 200);
  const body = await response.text();
  assert.equal(body, home())
})

test('POST request submits name and message to haiku board', async () => {
  const app = server.listen(9876);
  const response = await fetch("http://localhost:9876/home", {
    method: "POST",
      body: "haiku=haikuExample&poet=Shakespeare",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
  });
  app.close();

  assert.equal(response.status, 200);
  const body = await response.text();
  assert.match(body, /haikuExample/, /Shakespeare/); 
})

test('POST request checks empty name and message lead to 404', async () => {
  const app = server.listen(9876);
  const response = await fetch("http://localhost:9876/home", {
    method: "POST",
      body: "haiku=&poet=",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
  });
  app.close();

  assert.equal(response.status, 404);
})