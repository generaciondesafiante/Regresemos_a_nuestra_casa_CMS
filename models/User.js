const { Schema, model } = require("mongoose");

const lessonSchema = new Schema({
  idLesson: {
    type: String,
    required: false,
    unique: true,
  },
  idVideo: {
    type: String,
    required: false,
    unique: true,
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
    unique: true,
  },
  lessons: [lessonSchema],
  sequentialTopic: { type: String },
});

const courseSchema = new Schema({
  idCourse: {
    type: String,
    required: false,
    unique: true,
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
    unique: true,
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

  CourseProgress: [courseSchema],
  lastViewedInfo: {
    courseName: {
      type: String,
    },
    idCourse: {
      type: String,
      required: false,
      unique: true,
    },
    idVideo: {
      type: String,
      required: false,
      unique: true,
    },
    tema: {
      type: String,
    },
    indexTopic: {
      type: String,
    },
    urlVideo: {
      type: String,
    },
  },
});

const User = model("User", UserSchema);

module.exports = User;
