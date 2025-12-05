const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password, status } = req.body;
  try {
    const exisitingUser = await User.findByEmail(email);
    if (exisitingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username, //same as username:username because when te=he key and variables are the same we can write only one of them
      email,
      password: hashedPassword,
      status,
    });

    res
      .status(201)
      .json({ message: "User has been created successfully.", newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
