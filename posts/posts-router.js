const express = require("express");
const server = express.Router();

// model
const db = require("./post-model");
//Validation
const validatePosts = require("../Validation/posts-validation");
//global helper
const getAllItem = (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving the posts" });
    });
};

// @route    GET api/posts
// @desc     Fetch All Posts
// @Access   Public
server.get("/", (req, res) => {
  getAllItem(req, res);
});
// @route    POST api/posts
// @desc     Create Single Post
// @Access   Public
server.post("/", (req, res) => {
  const { errors, isValid } = validatePosts(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  db.insert(req.body)
    .then(posts => {
      getAllItem(req, res);
    })
    .catch(err =>
      res.status(500).json({ message: "Error retrieving the posts" })
    );
});

module.exports = server;
2;
