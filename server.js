// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const sequelize = require("./config/database");
// const adminRoutes = require("./routes/adminRoutes");
// const userRoutes = require("./routes/userRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/admin", adminRoutes);
// app.use("/api/user", userRoutes);

// const PORT = process.env.PORT || 5000;

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
const adminRoutes = require("./routes/adminRoutes");
const teacherRoutes = require("./routes/teacherRoutes");

// Models import qilish (relations uchun)
require("./models/Teacher");
require("./models/Interview");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);

const PORT = process.env.PORT || 5001;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database sync error:", err);
  });