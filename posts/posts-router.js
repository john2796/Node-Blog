const express = require("express");
const server = express.Router();

// model
const Posts = require("./post-model");
const Users = require("../users/users-model");
//Validation
const validatePosts = require("../Validation/posts-validation");
//global helper
const getAllItems = (req, res) => {
  Posts.findAll()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

// @route    GET api/posts/query
// @desc     Fetch All query ?
// @Access   Public
server.get("/query", (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// @route    GET api/posts
// @desc     Fetch All Posts
// @Access   Public
server.get("/", (req, res) => {
  getAllItems(req, res);
});
// @route    POST api/posts
// @desc     Create Single Post
// @Access   Public
server.post("/:id", (req, res) => {
  const { text } = req.body;
  const { errors, isValid } = validatePosts(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Users.findById(req.params.id)
    .then(user => {
      if (user) {
        Posts.insert({ text, user_id: req.params.id }).then(post =>
          getAllItems(req, res)
        );
      } else {
        res.status(404).json({ message: "User Not Found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Internal Server Error " });
    });
});

// @route    GET api/posts
// @desc     Fetch Single Post by their id
// @Access   Public
server.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "post not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// @route    DELETE api/posts
// @desc     DELETE Single Post
// @Access   Public
server.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then(post => {
      if (post) {
        getAllItems(req, res);
      } else {
        res.status(404).json({ message: "Post not Found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// @route    Update api/posts/:id
// @desc     Update Single Post
// @Access   Public
server.put("/:id", (req, res) => {
  const { errors, isValid } = validatePosts(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Posts.update(req.params.id, req.body)
    .then(post => {
      if (post) {
        getAllItems(req, res);
      } else {
        res.status(404).json({ message: "post not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});

module.exports = server;
