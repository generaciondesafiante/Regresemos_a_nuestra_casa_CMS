const { response } = require("express");
const Course = require("../../models/Courses");

const updateReorderTopicsFromCourse = async (req, res = response) => {
  const { courseId } = req.params;
  const { topicId, newPosition } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found");
    }

    const topicToMove = course.topic.id(topicId);
    if (!topicToMove) {
      return res.status(404).send("Topic not found");
    }

    if (newPosition < 0 || newPosition > course.topic.length) {
      return res.status(400).send("Invalid newPosition. Must be within range.");
    }

    const currentIndex = course.topic.findIndex((t) => t.id === topicId);
    if (currentIndex === -1) {
      return res.status(404).send("Topic not found in course");
    }

    course.topic.splice(currentIndex, 1);

    course.topic.splice(newPosition, 0, topicToMove);

    await course.save();
    res.status(200).send("Topic reordered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error reordering topic");
  }
};

module.exports = updateReorderTopicsFromCourse