require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

//import routes
const postsRoute = require("./posts/posts-router");
const usersRoute = require("./users/users-router");

//init server
const server = express();
//middleware
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger("dev"));

//use routes
server.use("/api/posts", postsRoute);
server.use("/api/users", usersRoute);

const port = process.env.PORT || 5000;
// dev production
server.listen(port, () => {
  console.log(`+++++++ Server runing on PORT ${port} +++++++ `);
});
