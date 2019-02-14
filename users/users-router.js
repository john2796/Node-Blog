const express = require("express");
const server = express.Router();

//import model
const Users = require("./users-model");
//import validation
const validateUserPost = require("../Validation/users-validation");
const getAllUser = (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Cannot retrieve User" });
    });
};

const upCaseMiddleWare = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ message: "name required" });
  } else {
    req.body.name = req.body.name.toUpperCase();
    next();
  }
};

// @route    GET api/users
// @desc     Fetch All Users
// @Access   Public
server.get("/", (req, res) => {
  getAllUser(req, res);
});
// @route    GET api/users/:id
// @desc     Get single User
// @Access   Public
server.get("/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});
// @route    POST api/users
// @desc     Post user
// @Access   Public
server.post("/", upCaseMiddleWare, (req, res) => {
  const { errors, isValid } = validateUserPost(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Users.insert(req.body)
    .then(post => {
      getAllUser(req, res);
    })
    .catch(err => {
      res.status(500).json({
        message: "Internal Server Error"
      });
    });
});
// @route    DELETE api/users/:id
// @desc     Delete user
// @Access   Public
server.delete("/:id", (req, res) => {
  Users.removePosts(req.params.id)
    .then(post => {
      Users.remove(req.params.id).then(user => {
        if (user) {
          getAllUser(req, res);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      });
    })
    .catch(err => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});
// @route    Update api/user
// @desc     update user
// @Access   Public
server.put("/:id", upCaseMiddleWare, (req, res) => {
  const { errors, isValid } = validateUserPost(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Users.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        Users.findById(req.params.id).then(user => {
          res.status(200).json(user);
        });
        // res.status(200).json({ message: "succesfully updated user", user });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});
// @route    GET api/posts/:id/messages
// @desc     getUserPosts Messages
// @Access   Public
server.get("/:id/messages", (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(post => {
      if (post.length) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch(err => {
      Users.status(500).json({ message: "Internal Server Error" });
    });
});

module.exports = server;
