const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//Endpoint -get all users and their departments(or show "Unassigned")

router.get("/all-users", authMiddleware, async (req, res) => {
  try {
    const query = `
    SELECT 
          u.id AS user_id,
          u.username AS user_name,
          u.email,
          u.status,
          COALESCE(d.name, 'Unassigned') AS department_name
          FROM users u
          LEFT JOIN users_departments ud ON u.id = ud.user_id
          LEFT JOIN departments d ON d.id = ud.department_id
          ORDER BY u.id ASC;`;

    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//enpoint - get all employees by department id

router.get("/department/:department_id", authMiddleware, async (req, res) => {
  const { department_id } = req.params;
  try {
    const query = `
    SELECT
     u.id AS user_id,
     u.username AS user_name,
     u.email,
     d.name AS department_name
     FROM users u
     INNER JOIN users_departments ud ON u.id=ud.user_id
     INNER JOIN departments d ON d.id =ud.department_id
     WHERE d.id=$1
     ORDER BY u.id ASC;
    `;

    const result = await pool.query(query, [department_id]);

    if (result.rows.length === 0) {
      return res
        .status(200)
        .json({ message: "No employees found on this department!" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
