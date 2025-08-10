const { response } = require("express");
const Course = require("../../../models/Courses");

const reorderResources = async (req, res = response) => {
  const { courseId, topicId } = req.params;
  const { resourceId, newPosition } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found");
    }

    const topic = course.topic.id(topicId);
    if (!topic) {
      return res.status(404).send("Topic not found");
    }

    const currentIndex = topic.resources.findIndex(
      (r) => r.toString() === resourceId
    );
    if (currentIndex === -1) {
      return res.status(404).send("Resource not found in topic");
    }

    if (newPosition < 0 || newPosition >= topic.resources.length) {
      return res.status(400).send("Invalid newPosition. Must be within range.");
    }

    const [resourceToMove] = topic.resources.splice(currentIndex, 1);

    topic.resources.splice(newPosition, 0, resourceToMove);

    await course.save();
    res.status(200).send("Resource reordered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error reordering resource");
  }
};

module.exports = reorderResources;
