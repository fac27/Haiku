const server = require("./server.js");

const port = process.env.PORT || "8080";
server.listen(port, () => console.log(`Listening at http://localhost:${port}`));