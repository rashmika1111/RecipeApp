const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./Routes/authRoute");

const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("API is working 🚀");
});


app.use("/api/auth", authRoutes);


mongoose.connect("mongodb://localhost:27017/recipe")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
