const Course = require("../models/courseModel");


const createCourse = async (req, res) => {
    try {

        const { title, description, category, imageUrl } = req.body;

        if (!title || !description || !category) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        const courseData = {
            title,
            description,
            category,
            instructor: req.user._id,
        }

        if (imageUrl) {
            courseData.imageUrl = imageUrl
        }

        const course = await Course.create(courseData);

        res.status(201).json(course);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}


const getAllCourses = async (req, res) => {
    try {

        const courses = await Course.find({})
            .populate("instructor", "name email");

        res.status(200).json(courses);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
const getCourseById = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id).populate("instructor", "name email");

        if (course) {
            res.status(200).json(course);
        }
        else {
            res.status(404).json({ message: 'Course not found' });
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });

        }

        if (course.instructor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'User not authorized to update this course' });
        }

        const { title, description, category, imageUrl } = req.body;

        course.title = title || course.title;
        course.description = description || course.description;
        course.category = category || course.category;
        course.imageUrl = imageUrl || course.imageUrl;

        const updatedCourse = await course.save();

        res.status(200).json(updatedCourse);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }

}

const deleteCourse = async (req, res) => {
    try {

        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.instructor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'User not authorized to delete this course' });
        }

        await course.deleteOne();

        res.status(200).json({ message: 'Course removed successfully' });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
};