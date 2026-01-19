const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const Category = require("../models/Category");
const Question = require("../models/Question");
const Interview = require("../models/Interview");
const sequelize = require("../config/database");

// Login
router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const teacher = await Teacher.findOne({ where: { login, password } });

    if (!teacher) {
      return res.status(401).json({ error: "Login yoki parol noto'g'ri" });
    }

    res.json({
      id: teacher.id,
      fullName: teacher.fullName,
      login: teacher.login,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
      order: sequelize.literal("random()"),
      limit: 10,
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Natijani saqlash
router.post("/interviews", async (req, res) => {
  try {
    const {
      teacherId,
      categoryId,
      studentFullName,
      foundCount,
      totalQuestions,
      percentage,
      status,
    } = req.body;

    const interview = await Interview.create({
      teacherId,
      categoryId,
      studentFullName,
      foundCount,
      totalQuestions,
      percentage,
      status,
    });

    res.status(201).json(interview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// O'qituvchining barcha suhbatlarini olish
router.get("/interviews/:teacherId", async (req, res) => {
  try {
    const interviews = await Interview.findAll({
      where: { teacherId: req.params.teacherId },
      include: [
        { model: Category, attributes: ["name"] },
        { model: Teacher, attributes: ["fullName"] },
      ],
      order: [["interviewDate", "DESC"]],
    });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
