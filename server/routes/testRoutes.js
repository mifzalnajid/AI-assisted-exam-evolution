const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
    "/teacher-only",
    protect,
    authorizeRoles("teacher"),
    (req, res) => {
        res.json({ message: "Welcome Teacher 👨‍🏫" });
    }
);

module.exports = router;
