const Topic = require("../../../models/Topics");

const getTopicById = async (req, res) => {
  try {
    const { topicId } = req.params;
    if (!topicId) {
      return res.status(400).send({ error: "Topic ID is required" });
    }

    const topic = await Topic.findById(topicId).lean();
    if (!topic) {
      return res.status(404).send({ error: "Topic not found" });
    }

    const responseTopic = {
      _id: topic._id,
      nameTopic: topic.nameTopic,
      isActive: topic.isActive,
    };

    res.status(200).send({
      topic: responseTopic,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send({ error: error.message });
  }
};

module.exports = getTopicById;
