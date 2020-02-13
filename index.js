// code away!
const server = require("./server.js");

const port = process.env.PORT || 4000;
// const port = 5000;

server.listen(port, () => {
  console.log(`\n*** Server running on http://localhost:${port} ***\n`);
});
