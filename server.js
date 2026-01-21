// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const sequelize = require("./config/database");
// const adminRoutes = require("./routes/adminRoutes");
// const teacherRoutes = require("./routes/teacherRoutes");

// // Models import
// require("./models/Teacher");
// require("./models/Group");
// require("./models/Student");
// require("./models/Interview");
// require("./models/Category");
// require("./models/Question");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/admin", adminRoutes);
// app.use("/api/teacher", teacherRoutes);

// const PORT = process.env.PORT || 5001;

// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Database synced");
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Database sync error:", err);
//   });














require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");

// Routes
const adminRoutes = require("./routes/adminRoutes");
const teacherRoutes = require("./routes/teacherRoutes");

// Models (tartib MUHIM)
require("./models/Teacher");
require("./models/Group");
require("./models/Student");
require("./models/Interview");
require("./models/Category");
require("./models/Question");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Quiz App Backend is running",
  });
});

/* ================= SERVER START ================= */
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected");

    // Production uchun alter tavsiya qilinmaydi
    await sequelize.sync({ alter: true });
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server start error:", error);
    process.exit(1);
  }
})();
