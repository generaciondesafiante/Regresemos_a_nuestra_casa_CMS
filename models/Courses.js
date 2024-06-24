const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    nameCourse: { type: String, required: true },
    titleCourse: { type: String, required: true },
    typeOfRoute: { type: String, required: true },
    topic: [
      {
        nameTopic: { type: String },
        resources: [
          {
            _id: { type: Schema.Types.ObjectId, ref: "Resource" },
            isCompleted: { type: Boolean, required: false }, // Optional for clarity
          },
        ],
      },
    ],
  },
  { select: { topic: { resources: { isCompleted: { $ne: null } } } } }
); // Exclude resources with null isCompleted for flexible courses

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
