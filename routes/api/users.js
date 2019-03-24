const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

//load user model
const User = require("../../models/User");

// @route   GET api/users /test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "User Works" }));
router.get("/test2", (req, res) => res.json({ msg: "Okay this works" }));

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: req.body.name,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    login user /Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
   console.log("user" , req.body.email , req.body.password);
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      return res.status(400).json({ email: "User Does not exist" });
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        return res.json({ email: "Success" });
      } else {
        return res.status(400).json({ email: "invalid credentials" });
      }
    });
  });
});

module.exports = router;
