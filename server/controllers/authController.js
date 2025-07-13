const { createUser } = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const { uid, name, email, photo } = req.body;

    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await createUser({ uid, name, email, photo });
    res.status(200).json({ message: "User saved", user });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { registerUser };
