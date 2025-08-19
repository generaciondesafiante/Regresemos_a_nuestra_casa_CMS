const { Schema, model, models } = require("mongoose");

const ResourceSchema = new Schema({
  resourceUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  typeResource: { type: String },
  visibility: { type: String },
  miniaturaUrl: { type: String },
});

const LastViewedResourceSchema = new Schema({
  courseName: { type: String, required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  topicName: { type: String, required: true },
  topicId: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  resource: { type: ResourceSchema, required: true },
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
  lastViewedResources: [LastViewedResourceSchema],
},{ timestamps: true });

UserSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = models.User || model("User", UserSchema);

module.exports = User;
