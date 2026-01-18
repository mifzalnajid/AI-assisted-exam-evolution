const express = require("express");
const { addQuestion } = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { getQuestionsForExam } = require("../controllers/questionController");

const router = express.Router();

router.post(
    "/",
    protect,
    authorizeRoles("teacher"),
    addQuestion
);


router.get(
    "/exam/:examId",
    protect,
    authorizeRoles("student"),
    getQuestionsForExam
);


module.exports = router;

