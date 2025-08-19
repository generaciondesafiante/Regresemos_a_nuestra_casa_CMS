const mongoose = require('mongoose');
const Topic = require("../../../models/Topics");
const Course = require("../../../models/Courses");

const createTopic = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { nameTopic, courseId } = req.body;

    // Validación de entrada
    if (!nameTopic || !courseId) {
      return res.status(400).json({ 
        ok: false,
        error: "Se requieren nameTopic y courseId" 
      });
    }

    // Verificar si el curso existe
    const course = await Course.findById(courseId).session(session);
    if (!course) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ 
        ok: false,
        error: "Curso no encontrado" 
      });
    }

    // Crear el tema en la misma transacción
    const [topic] = await Topic.create([{ nameTopic }], { session });
    
    // Agregar el ID del tema al curso
    course.topics.push(topic._id);
    await course.save({ session });

    // Confirmar la transacción
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      ok: true,
      topic
    });

  } catch (error) {
    // En caso de error, deshacer la transacción
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    
    console.error("Error al crear tema:", error);
    res.status(500).json({ 
      ok: false,
      error: "Error al crear el tema",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = createTopic;
