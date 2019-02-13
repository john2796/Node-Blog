const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const port = 5000;

//import routes
const postsRoute = require("./posts/posts-router");

//init server
const server = express();
//middleware
server.use(express.json());
server.use(helmet());
server.use(logger("dev"));

//use routes
server.use("/api/posts", postsRoute);

// dev production
server.listen(port, () => {
  console.log(`+++++++ Server runing on PORT ${port} +++++++ `);
});
