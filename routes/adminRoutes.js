// const express = require("express");
// const router = express.Router();
// const Category = require("../models/Category");
// const Question = require("../models/Question");

// // Bo'lim yaratish
// router.post("/categories", async (req, res) => {
//   try {
//     const { name } = req.body;
//     const category = await Category.create({ name });
//     res.status(201).json(category);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Barcha bo'limlarni olish
// router.get("/categories", async (req, res) => {
//   try {
//     const categories = await Category.findAll({
//       include: [{ model: Question, attributes: ["id"] }],
//     });
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Bo'limni o'chirish
// router.delete("/categories/:id", async (req, res) => {
//   try {
//     await Category.destroy({ where: { id: req.params.id } });
//     res.json({ message: "Category deleted" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Savol qo'shish
// router.post("/questions", async (req, res) => {
//   try {
//     const { text, categoryId } = req.body;
//     const question = await Question.create({ text, categoryId });
//     res.status(201).json(question);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Bo'lim bo'yicha savollarni olish
// router.get("/questions/:categoryId", async (req, res) => {
//   try {
//     const questions = await Question.findAll({
//       where: { categoryId: req.params.categoryId },
//     });
//     res.json(questions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Savolni o'chirish
// router.delete("/questions/:id", async (req, res) => {
//   try {
//     await Question.destroy({ where: { id: req.params.id } });
//     res.json({ message: "Question deleted" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;






















const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Question = require("../models/Question");
const Teacher = require("../models/Teacher");

// Bo'lim yaratish
router.post("/categories", async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Barcha bo'limlarni olish
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Question, attributes: ["id"] }],
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bo'limni o'chirish
router.delete("/categories/:id", async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.id } });
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Savol qo'shish
router.post("/questions", async (req, res) => {
  try {
    const { text, categoryId } = req.body;
    const question = await Question.create({ text, categoryId });
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Bo'lim bo'yicha savollarni olish
router.get("/questions/:categoryId", async (req, res) => {
  try {
    const questions = await Question.findAll({
      where: { categoryId: req.params.categoryId },
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Savolni o'chirish
router.delete("/questions/:id", async (req, res) => {
  try {
    await Question.destroy({ where: { id: req.params.id } });
    res.json({ message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// O'qituvchi yaratish
router.post("/teachers", async (req, res) => {
  try {
    const { fullName, login, password } = req.body;
    const teacher = await Teacher.create({ fullName, login, password });
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Barcha o'qituvchilarni olish
router.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.findAll({
      attributes: ["id", "fullName", "login", "createdAt"],
    });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// O'qituvchini o'chirish
router.delete("/teachers/:id", async (req, res) => {
  try {
    await Teacher.destroy({ where: { id: req.params.id } });
    res.json({ message: "Teacher deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;