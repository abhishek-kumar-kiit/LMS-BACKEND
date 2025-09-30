const express = require("express");
const { enrollInCourse, getMyEnrollments,markLessonAsComplete } = require("../controllers/enrollmentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, enrollInCourse);
router.get("/", protect, getMyEnrollments);

router.route('/complete-lesson')
        .post(protect, markLessonAsComplete);

module.exports = router;
