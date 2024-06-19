const { Schema, model } = require("mongoose");

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

ResourceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Resource = model("Resource", ResourceSchema);
module.exports = Resource;
