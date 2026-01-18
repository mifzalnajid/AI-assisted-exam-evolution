const express = require("express");
const { submitExam } = require("../controllers/submissionController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { getStudentExamResults } = require("../controllers/submissionController");

const router = express.Router();

router.post("/", protect, authorizeRoles("student"), submitExam);

router.get(
    "/exam/:examId",
    protect,
    authorizeRoles("student"),
    getStudentExamResults
);

module.exports = router;
