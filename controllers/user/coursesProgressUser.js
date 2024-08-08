const { response } = require("express");
const mongoose = require("mongoose");
const User = require("../../models/User");
const Course = require("../../models/Courses");
const Resource = require("../../models/Resources");

const updateCourseProgress = async (req, res = response) => {
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

    let courseProgress = user.CourseProgress.find(
      (cp) => cp.course.toString() === courseId
    );

    if (!courseProgress) {
      courseProgress = {
        course: mongoose.Types.ObjectId(courseId),
        lastViewedTopic: {
          topic: [
            {
              topicId,
              lastViewedResource: resource,
            },
          ],
        },
      };
      user.CourseProgress.push(courseProgress);
    } else {
      const topicIndex = course.topic.findIndex(
        (topic) => topic._id.toString() === topicId
      );
      if (topicIndex === -1) {
        return res.status(400).json({ message: "Invalid topic ID" });
      }

      const lastViewedTopicId =
        courseProgress.lastViewedTopic.topic.length > 0
          ? courseProgress.lastViewedTopic.topic[
              courseProgress.lastViewedTopic.topic.length - 1
            ].topicId
          : null;

      let lastViewedTopicIndex = -1;
      if (lastViewedTopicId) {
        lastViewedTopicIndex = course.topic.findIndex(
          (topic) => lastViewedTopicId.toString() === topic._id.toString()
        );
      }

      if (lastViewedTopicIndex !== -1 && topicIndex < lastViewedTopicIndex) {
        return res
          .status(400)
          .json({ message: "Cannot update to a previous topic" });
      }

      let topicProgress = courseProgress.lastViewedTopic.topic.find(
        (t) => t.topicId.toString() === topicId
      );

      if (!topicProgress) {
        topicProgress = {
          topicId,
          lastViewedResource: resource,
        };
        courseProgress.lastViewedTopic.topic.push(topicProgress);
      } else {
        const resources = course.topic[topicIndex].resources;
        const lastViewedResourceIndex = resources.findIndex(
          (res) =>
            res._id.toString() ===
            topicProgress.lastViewedResource._id.toString()
        );
        const newResourceIndex = resources.findIndex(
          (res) => res._id.toString() === resourceId
        );

    

        if (newResourceIndex === -1) {
          return res.status(400).json({ message: "Invalid resource ID" });
        }

        if (newResourceIndex < lastViewedResourceIndex) {
          return res.status(400).json({
            message:
              "Cannot update to a previous resource within the same topic",
          });
        }

        topicProgress.lastViewedResource = resource;
      }
    }

    await user.save();
    return res.status(200).json({
      message: "Course progress updated successfully",
      courseProgress,
    });
  } catch (error) {
    console.error("Error updating course progress:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  updateCourseProgress,
};
