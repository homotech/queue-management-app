const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const businessRoutes = require("./routes/businessRoutes");
const queueRoutes = require("./routes/queueRoutes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to mongoose"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is working 💪");
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/queue", queueRoutes);
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
