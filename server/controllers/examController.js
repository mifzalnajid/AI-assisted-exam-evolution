const Exam = require("../models/Exam");

exports.createExam = async (req, res) => {
    try {
        const { title, subject, duration } = req.body;

        const exam = await Exam.create({
            title,
            subject,
            duration,
            teacherId: req.user.id, // from JWT
        });

        res.status(201).json({
            message: "Exam created successfully",
            exam,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyExams = async (req, res) => {
    try {
        const exams = await Exam.find({ teacherId: req.user.id })
            .sort({ createdAt: -1 });

        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find().sort({ createdAt: -1 });
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
