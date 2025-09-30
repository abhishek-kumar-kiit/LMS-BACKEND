const express = require("express");
const {updateLesson,deleteLesson} = require('../controllers/lessonController');const { protect, isInstructor } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route('/:lessonId')
  .put(protect, isInstructor, updateLesson)
  .delete(protect, isInstructor, deleteLesson);

module.exports = router;
