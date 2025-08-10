const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  nameCourse: { type: String, required: true },
  titleCourse: { type: String, required: true },
  typeOfRoute: { type: String, enum: ["strict", "flexible"], required: true },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }]
});

module.exports = mongoose.model("Course", CourseSchema);
