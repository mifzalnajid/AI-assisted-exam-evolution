const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        examId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
        },
        questionText: {
            type: String,
            required: true,
        },
        modelAnswer: {
            type: String,
            required: true,
        },
        maxMarks: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
