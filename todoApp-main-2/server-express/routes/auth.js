const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const privateKey = "";
const saltRounds = 10;

router.use(async function (req, res, next) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.hashedPassword = hash;
    next();
  } catch (error) {
    next(error);
  }
});

router.post("/register", async function (req, res, next) {
  if (req.body.username && req.body.password && req.body.passwordConfirmation) {
    if (req.body.password === req.body.passwordConfirmation) {
      const user = new User({
        username: req.body.username,
        password: req.hashedPassword,
      });
      try {
        const savedUser = await user.save();
        return res.status(201).json({
          id: savedUser._id,
          username: savedUser.username,
        });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
    res.status(400).json({ error: "Passwords not same" });
  } else {
    res.status(400).json({ error: "Username or Password is Missing" });
  }
});

router.post("/login", async function (req, res, next) {
  if (req.body.username && req.body.password) {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (user) {
      try {
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result === true) {
          const token = jwt.sign({ id: user._id }, privateKey, {
            algorithm: "RS256",
          });
          return res.status(200).json({ access_token: token });
        } else {
          return res.status(401).json({ error: "Invalid credentials." });
        }
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
    return res.status(401).json({ error: "Invalid credentials." });
  } else {
    res.status(400).json({ error: "Username or Password is Missing" });
  }
});

module.exports = router;