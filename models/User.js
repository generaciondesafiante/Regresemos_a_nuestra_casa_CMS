const { Schema, model } = require("mongoose");

const topicSchema = new Schema({
  topicId: { type: String },
  lastViewedResource: { type: String },
});

const courseSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  lastViewedTopic: [topicSchema],
});

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: false,
  },
  image: {
    type: String,
  },
  admin: {
    type: Boolean,
  },
  CourseProgress: [courseSchema],
  lastViewedVideos: [
    {
      courseName: {
        type: String,
      },
      courseId: {
        type: String,
        required: false,
      },
      videoId: {
        type: String,
        required: false,
      },
      topicName: {
        type: String,
      },
      sequentialTopic: {
        type: String,
      },
      URLVideo: {
        type: String,
      },
      videoViewed: {
        type: String,
      },
    },
  ],
});

const User = model("User", UserSchema);

module.exports = User;
