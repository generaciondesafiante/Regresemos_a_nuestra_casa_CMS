const { Schema, model } = require("mongoose");

const ResourceSchema = new Schema({
  resource: { type: Schema.Types.ObjectId, ref: "Resource" },
  isMandatory: { type: Boolean, required: false },
  viewResorce: {
    type: Boolean,
    default: false,
  },
});

const topicSchema = new Schema({
  nameTopic: { type: String },
  resources: [ResourceSchema],
  lastViewedResource: { type: Schema.Types.ObjectId, ref: "Resource" },
});

const courseSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  lastViewedTopic: {
    nameTopic: { type: String },
    lastViewedResource: { type: Schema.Types.ObjectId, ref: 'Resource' },
  },
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
