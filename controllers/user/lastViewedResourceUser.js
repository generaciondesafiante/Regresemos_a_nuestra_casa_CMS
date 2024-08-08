const { response } = require("express");
const mongoose = require("mongoose");
const User = require("../../models/User");
const Course = require("../../models/Courses");
const Resource = require("../../models/Resources");

const lastViewedResource = async (req, res = response) => {
  const { userId, courseId, topicId, resourceId } = req.body;

  try {
    // Validar si el userId es válido
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Buscar el usuario por ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Buscar el curso por ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Buscar el recurso por ID
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Buscar el tema dentro del curso
    const topic = course.topic.find(
      (topic) => topic._id.toString() === topicId
    );
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Crear el objeto del último recurso visto
    const lastViewedResource = {
      courseName: course.nameCourse,
      courseId: course._id,
      topicName: topic.nameTopic,
      topicId: topic._id,
      resource: resource,
    };

    // Remover cualquier registro anterior en lastViewedResources
    user.lastViewedResources = [];

    // Agregar solo el nuevo recurso visto
    user.lastViewedResources.push(lastViewedResource);

    // Guardar los cambios en la base de datos
    await user.save();

    // Enviar la respuesta al cliente
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
