const { response } = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const Course = require("../models/Courses");

const updateCourseProgress1 = async (req, res = response) => {
  const { userId, courseId, topicId, resourceId } = req.body;

  try {
    // Verifica si userId es un ObjectId válido
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

    let courseProgress = user.CourseProgress.find(
      (cp) => cp.course.toString() === courseId
    );

    if (!courseProgress) {
      // Si el progreso del curso no existe, se crea
      courseProgress = {
        course: mongoose.Types.ObjectId(courseId),
        lastViewedTopic: { topicId, lastViewedResource: resourceId },
      };
      user.CourseProgress.push(courseProgress);
    } else {
      const topicIndex = course.topic.findIndex(
        (topic) => topic._id.toString() === topicId
      );
      if (topicIndex === -1) {
        return res.status(400).json({ message: "Invalid topic ID" });
      }

      const lastViewedTopicIndex = course.topic.findIndex(
        (topic) =>
          courseProgress.lastViewedTopic.topicId === topic._id.toString()
      );

      if (lastViewedTopicIndex !== -1 && topicIndex < lastViewedTopicIndex) {
        return res
          .status(400)
          .json({ message: "Cannot update to a previous topic" });
      }

      if (
        courseProgress.lastViewedTopic.topicId === topicId &&
        parseInt(resourceId, 10) <
          parseInt(courseProgress.lastViewedTopic.lastViewedResource, 10)
      ) {
        return res
          .status(400)
          .json({ message: "Cannot save lower resource progress" });
      }

      courseProgress.lastViewedTopic = {
        topicId,
        lastViewedResource: resourceId,
      };
    }

    await user.save();
    return res
      .status(200)
      .json({ message: "Course progress updated successfully" });
  } catch (error) {
    console.error("Error updating course progress:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const lastViewedVideos = async (req, res = response) => {
  const {
    id,
    courseName,
    courseId,
    videoId,
    topicName,
    sequentialTopic,
    URLVideo,
    videoViewed,
  } = req.body;

  try {
    let user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }
    if (!user.lastViewedVideos) {
      user.lastViewedVideos = [];
    }

    let courseIndex = user.lastViewedVideos.findIndex(
      (info) => info.courseId === courseId
    );

    if (courseIndex !== -1) {
      user.lastViewedVideos[courseIndex] = {
        courseName,
        courseId: courseId,
        videoId: videoId,
        topicName,
        sequentialTopic,
        URLVideo,
        videoViewed: videoViewed,
      };
    } else {
      if (user.lastViewedVideos.length === 3) {
        user.lastViewedVideos.shift();
      }
      user.lastViewedVideos.push({
        courseName,
        courseId: courseId,
        videoId: videoId,
        topicName,
        sequentialTopic,
        URLVideo,
        videoViewed,
      });
    }

    await user.save();
    res.json({
      ok: true,
      msg: "Estado del último video visualizado actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar el estado del video. Por favor, comunícate con el administrador.",
    });
  }
};

module.exports = {
  updateCourseProgress1,
};