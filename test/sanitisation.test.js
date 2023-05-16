const test = require("node:test");
const assert = require("node:assert");
const server = require("../src/server.js")

test("POST with '<' and '>' tag is correctly santised", async () => {
    const app = server.listen(9876);
  const response = await fetch("http://localhost:9876/home", {
    method: "POST",
      body: "haiku=<>&poet=<>",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
  });
  app.close();

    assert.equal(response.status, 200);
    const body = await response.text();
    assert.match(body, /&lt;/);
})