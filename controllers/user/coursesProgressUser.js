const User = require("../../models/User");
const Course = require("../../models/Courses");
const CourseProgress = async (req, res) => {
  const { userId, courseId, topicName, resourceId, isMandatory } = req.body;

  try {
    // Buscar al usuario por ID y popular su progreso de curso
    const user = await User.findById(userId).populate({
      path: "CourseProgress.course",
      populate: {
        path: "topics.resources.resource",
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Encontrar el curso en el progreso del usuario
    let courseProgress = user.CourseProgress.find((cp) =>
      cp.course.equals(courseId)
    );

    // Si el curso no está en el progreso del usuario, añadirlo
    if (!courseProgress) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      courseProgress = {
        course: courseId,
        topics: [],
        lastViewedTopic: {
          nameTopic: topicName,
          lastViewedResource: resourceId,
        },
      };
      user.CourseProgress.push(courseProgress);
    }

    // Encontrar o crear el tema en el progreso del curso
    let topicProgress = courseProgress.topics.find(
      (t) => t.nameTopic === topicName
    );
    if (!topicProgress) {
      topicProgress = {
        nameTopic: topicName,
        resources: [],
        lastViewedResource: resourceId,
      };
      courseProgress.topics.push(topicProgress);
    }

    // Encontrar o crear el recurso en el progreso del tema
    let resourceProgress = topicProgress.resources.find((r) =>
      r.resource.equals(resourceId)
    );
    if (!resourceProgress) {
      resourceProgress = {
        resource: resourceId,
        isMandatory: isMandatory || false,
        viewResorce: false, // Default to false when created
      };
      topicProgress.resources.push(resourceProgress);
    }

    // Actualizar el último recurso visto
    topicProgress.lastViewedResource = resourceId;
    courseProgress.lastViewedTopic = {
      nameTopic: topicName,
      lastViewedResource: resourceId,
    };

    await user.save();

    res
      .status(200)
      .json({ message: "Progress updated successfully", courseProgress });
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
