const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const Category = require("../models/Category");
const Question = require("../models/Question");
const Interview = require("../models/Interview");
const Group = require("../models/Group");
const Student = require("../models/Student");
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

// Guruhlar
router.get("/groups/:teacherId", async (req, res) => {
  try {
    const groups = await Group.findAll({
      where: { teacherId: req.params.teacherId },
      include: [{ model: Student }],
    });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/groups", async (req, res) => {
  try {
    const { name, teacherId } = req.body;
    const group = await Group.create({ name, teacherId });
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/groups/:id", async (req, res) => {
  try {
    await Group.destroy({ where: { id: req.params.id } });
    res.json({ message: "Group deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// O'quvchilar
router.post("/students", async (req, res) => {
  try {
    const { fullName, groupId } = req.body;
    const student = await Student.create({ fullName, groupId });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/students/:groupId", async (req, res) => {
  try {
    const students = await Student.findAll({
      where: { groupId: req.params.groupId },
      include: [
        {
          model: Interview,
          include: [{ model: Category }],
        },
      ],
      order: [["fullName", "ASC"]],
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/students/:id", async (req, res) => {
  try {
    await Student.destroy({ where: { id: req.params.id } });
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// O'quvchi profili va statistikalar
router.get("/student-profile/:studentId", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.studentId, {
      include: [
        { model: Group },
        {
          model: Interview,
          include: [{ model: Category }, { model: Teacher }],
          order: [["interviewDate", "DESC"]],
        },
      ],
    });

    if (!student) {
      return res.status(404).json({ error: "O'quvchi topilmadi" });
    }

    // Statistikalar hisoblash
    const totalInterviews = student.Interviews.length;
    const passedInterviews = student.Interviews.filter(
      (i) => i.percentage >= 70
    ).length;
    const failedInterviews = totalInterviews - passedInterviews;
    const averagePercentage =
      totalInterviews > 0
        ? student.Interviews.reduce((sum, i) => sum + i.percentage, 0) /
          totalInterviews
        : 0;

    res.json({
      student,
      statistics: {
        totalInterviews,
        passedInterviews,
        failedInterviews,
        averagePercentage: averagePercentage.toFixed(2),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bo'limlar
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Random savollar
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

// Suhbat natijasini saqlash
router.post("/interviews", async (req, res) => {
  try {
    const {
      teacherId,
      studentId,
      categoryId,
      foundCount,
      totalQuestions,
      percentage,
      status,
    } = req.body;

    const interview = await Interview.create({
      teacherId,
      studentId,
      categoryId,
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

// O'qituvchining barcha suhbatlari
router.get("/interviews/:teacherId", async (req, res) => {
  try {
    const interviews = await Interview.findAll({
      where: { teacherId: req.params.teacherId },
      include: [
        { model: Category, attributes: ["name"] },
        { model: Teacher, attributes: ["fullName"] },
        {
          model: Student,
          attributes: ["fullName"],
          include: [{ model: Group }],
        },
      ],
      order: [["interviewDate", "DESC"]],
    });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
