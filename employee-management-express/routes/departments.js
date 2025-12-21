const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res
        .status(400)
        .json({ message: "Bad request. Name is required!" });
    }

    if (req.user.status !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only!" });
    }

    const query = `INSERT INTO departments (name) VALUES ($1) RETURNING *`;
    const result = await pool.query(query, [name]);

    // res.status(201).json(result.rows[0]);  //simple method

    res.status(201).json({
      success: true,
      message: "New department created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
});

router.post("/assign", authMiddleware, async (req, res) => {
  const { user_id, department_id } = req.body;

  try {
    if (req.user.status !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only!" });
    }

    if (!user_id || !department_id) {
      return res.status(400).json({
        message:
          "Bad request. Both user_id and department_id:Number are required!",
      });
    }

    const query =
      "INSERT INTO users_departments (user_id, department_id) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(query, [user_id, department_id]);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
});

module.exports = router;
