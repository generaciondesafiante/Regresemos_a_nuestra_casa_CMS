const { Schema, model } = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    _id: {
        type: Number,
        auto: true,
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
            _id: {
                type: Number,
                auto: true,
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

module.exports = mongoose.model("Course", CourseSchema);