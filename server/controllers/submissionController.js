const Submission = require("../models/Submission");
const Question = require("../models/Questions");
const { evaluateAnswer } = require("../services/aiServices");

exports.submitExam = async (req, res) => {
    try {
        const { examId, answers } = req.body;
        const studentId = req.user.id;

        // remove prior submissions for this student + exam
        await Submission.deleteMany({ examId, studentId });

        const evaluatedSubmissions = [];

        for (const ans of answers) {
            // find question details
            const question = await Question.findById(ans.questionId);

            // evaluate using AI
            const result = await evaluateAnswer({
                question: question.questionText,
                modelAnswer: question.modelAnswer,
                studentAnswer: ans.answer,
                maxMarks: question.maxMarks,
            });

            // save it
            const saved = await Submission.create({
                studentId,
                examId,
                questionId: ans.questionId,
                answer: ans.answer,
                score: result.score,
                feedback: result.feedback,
            });

            evaluatedSubmissions.push(saved);
        }

        res.status(201).json({
            message: "Exam submitted and evaluated",
            submissions: evaluatedSubmissions,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStudentExamResults = async (req, res) => {
    try {
        const { examId } = req.params;
        const studentId = req.user.id;

        const submissions = await Submission.find({ examId, studentId })
            .populate("questionId", "questionText maxMarks")
            .sort({ createdAt: 1 });

        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
