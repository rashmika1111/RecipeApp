const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./Routes/authRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/recipe")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
