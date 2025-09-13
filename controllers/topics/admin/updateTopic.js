const Topic = require("../../../models/Topics");

const updateTopic = async (req, res) => {
  try {
    const { topicId } = req.params;

    // Construir solo los campos válidos que se envíen
    const fieldsToUpdate = {};
    const allowedFields = ["nameTopic", "isActive"];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        fieldsToUpdate[field] = req.body[field];
      }
    });

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).send({ error: "No fields provided to update" });
    }

    const updatedTopic = await Topic.findByIdAndUpdate(
      topicId,
      fieldsToUpdate,
      { new: true, runValidators: true }
    );

    if (!updatedTopic) {
      return res.status(404).send({ error: "Topic not found" });
    }

    res.status(200).send(updatedTopic);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = updateTopic;
