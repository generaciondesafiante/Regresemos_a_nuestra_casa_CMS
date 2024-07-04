const User = require("../../models/User");
const Course = require("../../models/Courses");
const Resource = require("../../models/Resources");

const CourseProgress = async (req, res) => {
  const { userId, courseId, topicId, resourceId } = req.body;

  try {
    // Find the user by ID and populate CourseProgress and course
    const user = await User.findById(userId).populate({
      path: "CourseProgress.course",
      populate: {
        path: "lastViewedTopic",
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!Array.isArray(user.CourseProgress)) {
      return res
        .status(500)
        .json({ message: "Invalid user course progress structure" });
    }

    // Find the user's course progress
    let courseProgress = user.CourseProgress.find(
      (cp) => cp.course && cp.course.equals(courseId)
    );

    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find the position of the current topicId in the course topics list
    const currentTopicIndex = course.topic.findIndex(
      (t) => t._id.toString() === topicId
    );
    if (currentTopicIndex === -1) {
      return res.status(404).json({ message: "Topic not found in course" });
    }

    if (!courseProgress) {
      courseProgress = {
        course: courseId,
        lastViewedTopic: {
          topicId: topicId,
          lastViewedResource: resourceId,
        },
      };

      user.CourseProgress.push(courseProgress);
    } else {
      // Display the lastViewedTopic stored in the user's progress

      const lastViewedTopicId =
        courseProgress?.lastViewedTopic?.topicId ||
        course.topic[0]._id.toString(); // Use optional chaining and default to the first topic's ID

      const lastViewedTopicIndex = lastViewedTopicId
        ? course.topic.findIndex((t) => t._id.toString() === lastViewedTopicId)
        : -1;

      // Compare the positions of the current topic and the last viewed topic
      if (currentTopicIndex < lastViewedTopicIndex) {
        return res.status(400).json({
          message:
            "Cannot update with a lower or equal last viewed topic position",
        });
      }

      const currentResourceIndex = course.topic[
        currentTopicIndex
      ]?.resources.findIndex((r) => r._id.toString() === resourceId);
      const lastViewedResourceId =
        courseProgress.lastViewedTopic[0]?.lastViewedResource;

      const lastViewedResourcesIndex = course.topic[
        currentTopicIndex
      ]?.resources.findIndex((r) => r._id.toString() === lastViewedResourceId);

      if (currentResourceIndex < lastViewedResourcesIndex) {
        return res.status(400).json({
          message:
            "Cannot update with a lower or equal last viewed resource position",
        });
      }

      // Update the last viewed topic and the last viewed resource in that topic
      courseProgress.lastViewedTopic = {
        topicId: topicId,
        lastViewedResource: resourceId,
      };
    }

    // Save the changes in the user
    await user.save();

    res.status(200).json({
      message: "Progress updated successfully",
      courseProgress: {
        course: courseProgress.course,
        lastViewedTopic: {
          topicId: courseProgress.lastViewedTopic.topicId,
          lastViewedResource: courseProgress.lastViewedTopic.lastViewedResource,
        },
      },
    });
  } catch (error) {
    console.error("Error updating course progress:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  CourseProgress,
};
