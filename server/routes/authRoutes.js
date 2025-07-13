const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcryptjs");

// Example register route
router.post("/register", async (req, res) => {
  const { name, email, password, provider } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password, provider) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, provider || 'local']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

module.exports = router; // ✅ this line is essential
