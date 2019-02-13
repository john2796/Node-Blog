const express = require("express");
const server = express.Router();

//import model
const db = require("./users-model");
//import validation
const validateUserPost = require("../Validation/users-validation");
// @route    GET api/users
// @desc     Fetch All Users
// @Access   Public
server.get("/", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Cannot retrieve User" });
    });
});
// @route    GET api/users/:id
// @desc     Get single User
// @Access   Public
server.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Cannot retrieve User" });
    });
});
// @route    POST api/users
// @desc     Post user
// @Access   Public
server.post("/", (req, res) => {
  const { errors, isValid } = validateUserPost(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  db.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "Cannot create post" });
    });
});
// @route    DELETE api/users/:id
// @desc     Delete user
// @Access   Public
server.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json({ message: "successfully deleted" });
      } else {
        res.status(404).json({ message: "User Not Found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error Removing the User" });
    });
});
// @route    Update api/user
// @desc     update user
// @Access   Public
server.put("/:id", (req, res) => {
  const { errors, isValid } = validateUserPost(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  db.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        db.findById(req.params.id).then(user => {
          res.status(200).json(user);
        });
        // res.status(200).json({ message: "succesfully updated user", user });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Cannot update" });
    });
});

module.exports = server;
