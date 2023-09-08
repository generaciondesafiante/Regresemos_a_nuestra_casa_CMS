const { Schema, model } = require("mongoose");

const CourseSchema = new Schema({
    id: {
        type: Number,
        // auto: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    endpoint: {
        type: String,
        required: true,
        trim: true,
    },
    content: [
        {
            idvideo: {
                type: Number,
                unique: true,
            },
            title: {
                type: String,
                required: true,
                trim: true,
            },
            description: {
                type: String,
                required: true,
                trim: true,
            },
            url: {
                type: String,
                required: true,
                trim: true,
            },
        },
    ],
});

module.exports = model("Course", CourseSchema);