// const express = require("express");
// const router = express.Router();
// const Category = require("../models/Category");
// const Question = require("../models/Question");

// // Barcha bo'limlarni olish
// router.get("/categories", async (req, res) => {
//   try {
//     const categories = await Category.findAll();
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Bo'lim bo'yicha random 10 ta savol olish
// router.get("/quiz/:categoryId", async (req, res) => {
//   try {
//     const questions = await Question.findAll({
//       where: { categoryId: req.params.categoryId },
//       order: sequelize.literal("random()"),
//       limit: 10,
//     });
//     res.json(questions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;













const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Question = require("../models/Question");
const sequelize = require("../config/database"); // ← QO'SHISH KERAK!

// Barcha bo'limlarni olish
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bo'lim bo'yicha random 10 ta savol olish
router.get("/quiz/:categoryId", async (req, res) => {
  try {
    const questions = await Question.findAll({
      where: { categoryId: req.params.categoryId },
      order: sequelize.literal("random()"), // ← Bu uchun sequelize kerak!
      limit: 10,
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;