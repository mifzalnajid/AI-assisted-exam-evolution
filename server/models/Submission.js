const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        examId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
        },
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            default: null, // after AI evaluation
        },
        feedback: {
            type: String,
            default: null, // from AI
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);
