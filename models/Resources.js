const { Schema, model, models } = require("mongoose");

const ResourceSchema = new Schema(
  {
    title: { type: String, required: true },
    typeResource: { type: String, required: true },
    description: { type: String },
    visibility: { type: String },
    resourceUrl: {
      url: { type: String, required: true },
      publicId: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    miniaturaUrl: {
      url: { type: String, required: true },
      publicId: { type: String },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ResourceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Resource = models.Resource || model("Resource", ResourceSchema);
module.exports = Resource;
