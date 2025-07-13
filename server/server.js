const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const pool = require("./config/db"); // ✅ use pool

dotenv.config(); // Load .env

const app = express();

// CORS setup
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Root route to test backend
app.get("/", (req, res) => {
  res.send("Grassy Backend is Running 🟢");
});

// Auth routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
