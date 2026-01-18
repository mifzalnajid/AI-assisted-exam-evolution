const express = require("express");
const { createExam, getMyExams, getAllExams } = require("../controllers/examController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    authorizeRoles("teacher"),
    createExam
);

module.exports = router;

router.get(
    "/my",
    protect,
    authorizeRoles("teacher"),
    getMyExams
);


router.get(
    "/",
    protect,
    authorizeRoles("student", "teacher"),
    getAllExams
);