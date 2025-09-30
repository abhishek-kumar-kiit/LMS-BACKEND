const express = require("express");
const router = express.Router();
const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } = require("../controllers/courseController");
const { addLessonToCourse, getLessonsForCourse } = require('../controllers/lessonController');
const { protect, isInstructor } = require("../middleware/authMiddleware");


router
    .route("/")
    .post(protect, isInstructor, createCourse)
    .get(getAllCourses);

router
    .route("/:id")
    .get(getCourseById)
    .put(protect, isInstructor, updateCourse)
    .delete(protect, isInstructor, deleteCourse);


router
    .route('/:courseId/lessons')
    .post(protect, isInstructor, addLessonToCourse)
    .get(getLessonsForCourse);


    
module.exports = router;