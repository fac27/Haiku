const test = require("node:test");
const assert = require("node:assert");
const { home } = require("../src/template.js"); 
const server = require("../src/server.js");
const haikus = require("../src/server.js");


test("GET '/' takes user to the home page", async () => {
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

test('POST request checks empty for name and shows error message', async () => {
  const app = server.listen(9876);
  const response = await fetch("http://localhost:9876/home", {
    method: "POST",
      body: "haiku=&poet=",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
  });
  app.close();

  const body = await response.text();
  assert.match(body, /Field cannot be empty/);
})

test("/delete/:id request edits haikus array", async () => {
  const app = server.listen(9876);
  await fetch("http://localhost:9876/home", {
    method: "POST",
    body: "haiku=exampleHaiku&poet=Shakespeare",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    });
  await fetch("http://localhost:9876/delete/'0'", {
    method: "POST",
  });
    app.close();
    
    assert.equal(haikus, '[]')

  })







