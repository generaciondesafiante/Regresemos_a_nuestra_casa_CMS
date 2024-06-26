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
            isMandatory: { type: Boolean, required: false },
          },
        ],
      },
    ],
  },
  { select: { topic: { resources: { isMandatory: { $ne: null } } } } }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
