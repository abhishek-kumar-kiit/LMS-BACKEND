const mongoose = require("mongoose");

const enrollmentSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedLessons: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lesson",
        }
      ],
      default: [],
    }

  },
  { timestamps: true }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;
