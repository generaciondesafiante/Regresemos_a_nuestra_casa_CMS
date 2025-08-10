const Topic = require("../../models/Topics");

// Obtiene un topic por su ID y opcionalmente popula sus recursos.
const getTopicById = async (req, res) => {
  try {
    const { topicId } = req.params;

    if (!topicId) {
      return res.status(400).send({ error: "Topic ID is required" });
    }

    const topic = await Topic.findById(topicId)
      .populate("resources")
      .lean();

    if (!topic) {
      return res.status(404).send({ error: "Topic not found" });
    }

    res.status(200).send({ topic });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getTopicById;
