const Enrollment = require("../models/enrollmentModel");
const Course = require("../models/courseModel");
const Lesson = require('../models/lessonModel');

// Enroll in a course
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const alreadyEnrolled = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId,
    });

    res.status(201).json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all enrolled courses for a student
const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id }).populate("course", "'title description category imageUrl'");
    res.status(200).json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const markLessonAsComplete = async (req, res) => {

  try {

    const { lessonId } = req.body;
    const studentId = req.user._id;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: lesson.course,
    })

    if (!enrollment) {
      return res.status(404).json({ message: 'You are not enrolled in this course' });
    }

    await Enrollment.updateOne(
      { _id: enrollment._id },
      { $addToSet: { completedLessons: lessonId } }
    );
    res.status(200).json({ message: 'Lesson marked as complete' });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }

}

module.exports = { enrollInCourse, getMyEnrollments, markLessonAsComplete };
