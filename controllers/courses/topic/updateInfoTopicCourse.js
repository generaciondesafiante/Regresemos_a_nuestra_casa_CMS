const { response } = require("express");
const Course = require("../../../models/Courses");

const updateInfoTopicCourse = async (req, res = response) => {
  const { courseId, topicId } = req.params;
  const { nameTopic } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found");
    }

    const topic = course.topic.id(topicId);
    if (!topic) {
      return res.status(404).send("Topic not found");
    }

    if (nameTopic) {
      topic.nameTopic = nameTopic;
    }

    await course.save();
    res.status(200).send(topic);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating topic");
  }
};

module.exports = updateInfoTopicCourse;
