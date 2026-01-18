const Question = require("../models/Questions");

exports.addQuestion = async (req, res) => {
    try {
        const { examId, questionText, modelAnswer, maxMarks } = req.body;

        const question = await Question.create({
            examId,
            questionText,
            modelAnswer,
            maxMarks,
        });

        res.status(201).json({
            message: "Question added successfully",
            question,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getQuestionsForExam = async (req, res) => {
    try {
        const questions = await Question.find(
            { examId: req.params.examId },
            { modelAnswer: 0 } // exclude modelAnswer
        );

        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
