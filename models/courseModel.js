const mongoose = require("mongoose")

const courserSchema = mongoose.Schema({

    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },

},
    {
        timestamps: true,
    }

);

const Course=mongoose.model('Course',courserSchema);

module.exports=Course;