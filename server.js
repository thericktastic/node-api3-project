const express = require("express");

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

// global middleware
server.use(express.json()); // built-in middleware
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// routes - endpoints
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

//custom middleware
function logger(request, response, next) {
  console.log(
    `${new Date().toISOString()} - ${request.method} Request to ${
      request.originalUrl
    }`
  );
  next();
}

module.exports = server;
