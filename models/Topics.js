const mongoose = require("mongoose");
const { Schema } = mongoose;

const topicSchema = new Schema({
  nameTopic: { type: String, required: true },
  resources: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Resource" },
      isMandatory: { type: Boolean, required: false },
    },
  ],
  isActive: { type: Boolean, default: true },
});

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;
