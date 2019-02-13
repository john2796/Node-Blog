const express = require("express");
const server = express.Router();

// model
const db = require("./post-model");
//Validation
const validatePosts = require("../Validation/posts-validation");
//global helper
const getAllItems = (req, res) => {
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
  getAllItems(req, res);
});
// @route    POST api/posts
// @desc     Create Single Post
// @Access   Public
server.post("/", (req, res) => {
  const { text } = req.body;
  let user_id = Math.floor(Math.random() * 1000);
  if (!text) {
    res.status(400).json({ message: "Please provide title  for the post." });
  }
  db.insert(req.body)
    .then(post => {
      console.log(post);
      getAllItems(req, res);
      // res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error while saving the post to the database"
      });
    });
});

module.exports = server;
