const { Schema, model } = require("mongoose");

const lessonSchema = new Schema({
  idLesson: {
    type: String,
    required: false,
  },
  idVideo: {
    type: String,
    required: false,
  },
  viewVideo: {
    type: Boolean,
    default: false,
  },
  typeLesson: {
    type: String,
  },
  sequentialLesson: {
    type: String,
  },
});

const topicSchema = new Schema({
  idTopic: {
    type: String,
    required: false,
  },
  lessons: [lessonSchema],
  sequentialTopic: { type: String },
});

const courseSchema = new Schema({
  idCourse: {
    type: String,
    required: false,
  },
  mandatory: { type: Boolean },
  topics: [topicSchema],
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
  admin:{
    type:Boolean
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
