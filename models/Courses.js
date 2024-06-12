const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  nameCourse: { type: String, required: true },
  titleCourse: { type: String, required: true },
  typeOfRoute: { type: String, required: true },
  topic: [
    {
      nameTopic: { type: String },
      resources: [{ type: Schema.Types.ObjectId, ref: "Resource" }],
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
