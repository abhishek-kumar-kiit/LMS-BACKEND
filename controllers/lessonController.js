const Lesson = require('../models/lessonModel');
const Course = require('../models/courseModel');


const addLessonToCourse = async (req, res) => {
  try {

    const { title, content, order } = req.body;
    const { courseId } = req.params;

    if (!title || !content || !order) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to add lessons to this course' });
    }

    const lesson = await Lesson.create({
      title,
      content,
      order,
      course: courseId,
    });

    res.status(201).json(lesson);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

const getLessonsForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const lessons = await Lesson.find({ course: courseId }).sort({ order: 'asc' });
    res.status(200).json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId).populate('course');

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    if (lesson.course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to update this lesson' });
    }

    const { title, content, order } = req.body;
    lesson.title = title || lesson.title;
    lesson.content = content || lesson.content;
    lesson.order = order || lesson.order;

    const updatedLesson = await lesson.save();
    res.status(200).json(updatedLesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId).populate('course');

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    if (lesson.course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to delete this lesson' });
    }

    await lesson.deleteOne();
    res.status(200).json({ message: 'Lesson removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  addLessonToCourse,
  getLessonsForCourse,
  updateLesson,
  deleteLesson,
};