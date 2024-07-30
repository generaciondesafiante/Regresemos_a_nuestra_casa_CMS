const { Schema, model } = require("mongoose");

const ResourceSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "Resource" },
  resourceUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  typeResource: { type: String },
  visibility: { type: String },
  miniaturaUrl: { type: String },
});

const topicSchema = new Schema({
  topicId: { type: String },
  lastViewedResource: { type: ResourceSchema, ref: "Resource" },
});

const courseSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  lastViewedTopic: {
    topic: [topicSchema],
  },
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  lastname: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: Number },
  image: { type: String },
  admin: { type: Boolean },
  CourseProgress: [courseSchema],
  lastViewedVideos: [
    {
      courseName: { type: String },
      courseId: { type: String },
      videoId: { type: String },
      topicName: { type: String },
      sequentialTopic: { type: String },
      URLVideo: { type: String },
      videoViewed: { type: String },
    },
  ],
});

const User = model("User", UserSchema);

module.exports = User;
