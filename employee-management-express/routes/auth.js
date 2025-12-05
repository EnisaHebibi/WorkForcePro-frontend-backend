const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

//endpoint for register
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

//endpoint for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        status: user.status,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
