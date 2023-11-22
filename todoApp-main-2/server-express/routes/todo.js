const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const mongoose = require("mongoose");
const privateKey = "";

router.use(function (req, res, next) {
  try {
    if (req.header("Authorization")) {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
      next();
    } else {
      return res.status(401).json({ error: "Authorization header missing." });
    }
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});

router.post("/", async function (req, res) {
  try {
    const post = new Todo({
      title: req.body.title,
      description: req.body.description,
      author: req.payload.id,
      completed: false,
      dateCreated: req.body.dateCreated,
      dateCompleted: "",
    });

    const savedPost = await post.save();
    return res.status(201).json({
      id: savedPost._id,
      title: savedPost.title,
      description: savedPost.description,
      author: savedPost.author,
      completed: savedPost.completed,
      dateCreated: savedPost.dateCreated,
      dateCompleted: savedPost.dateCompleted,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


module.exports = router;