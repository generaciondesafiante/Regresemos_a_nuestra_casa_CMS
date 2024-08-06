const { response } = require("express");
const mongoose = require("mongoose");
const User = require("../../models/User");
const Course = require("../../models/Courses");
const Resource = require("../../models/Resources");

const lastViewedResource = async (req, res = response) => {
  const { userId, courseId, topicId, resourceId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const topic = course.topic.find(
      (topic) => topic._id.toString() === topicId
    );
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const lastViewedResource = {
      courseName: course.nameCourse,
      courseId: course._id,
      topicName: topic.nameTopic,
      topicId: topic._id,
      resource: resource,
    };

    user.lastViewedResources = user.lastViewedResources.filter(
      (lr) =>
        !(
          lr.courseId.toString() === courseId &&
          lr.topicId.toString() === topicId
        )
    );

    user.lastViewedResources.push(lastViewedResource);

    await user.save();
    return res.status(200).json({
      message: "Last viewed resource saved successfully",
      lastViewedResource,
    });
  } catch (error) {
    console.error("Error saving last viewed resource:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  lastViewedResource,
};
