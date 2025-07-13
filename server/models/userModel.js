const { pool } = require("../config/db");

const createUser = async (user) => {
  const { uid, name, email, photo } = user;

  const result = await pool.query(
    "INSERT INTO users (uid, name, email, photo) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING RETURNING *",
    [uid, name, email, photo]
  );

  return result.rows[0];
};

module.exports = { createUser };
