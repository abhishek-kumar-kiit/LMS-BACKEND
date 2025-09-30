const mongoose = require("mongoose")

const lessonModel = mongoose.Schema({

    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course',
    },
    title: {
        type: String,
        required: true,

    },
    content: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },

},

    {
        timestamps: true,
    }

);


const Lesson=mongoose.model('Lesson',lessonModel);

module.exports=Lesson;