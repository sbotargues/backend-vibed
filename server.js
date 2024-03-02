require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(cors());

const userRoutes = require("./src/routes/user");
const adminRoutes = require("./src/routes/admin");
const characterRoutes = require("./src/routes/character");
const businessRoutes = require("./src/routes/business");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/characters", characterRoutes);
app.use("/api/v1/business", businessRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
