const mongoose = require("mongoose");
const Topic = require("../../../models/Topics");
const Course = require("../../../models/Courses");

/**
 * Elimina un tema y lo desvincula de cualquier curso que lo contenga.
 *
 * Espera parámetro de ruta:
 *   - topicId: ID del tema a eliminar
 */
const deleteTopic = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { topicId } = req.params;

    // Validación básica
    if (!topicId) {
      return res.status(400).json({ ok: false, error: "Se requiere topicId" });
    }

    // Verificar si el tema existe
    const topic = await Topic.findById(topicId).session(session);
    if (!topic) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ ok: false, error: "Tema no encontrado" });
    }

    // Eliminar el tema
    await Topic.deleteOne({ _id: topicId }).session(session);

    // Eliminar la referencia del tema en todos los cursos que lo contengan
    await Course.updateMany(
      { topics: topicId },
      { $pull: { topics: topicId } }
    ).session(session);

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ ok: true, message: "Tema eliminado correctamente" });
  } catch (error) {
    if (session.inTransaction()) await session.abortTransaction();
    session.endSession();
    console.error("Error al eliminar el tema:", error);
    return res.status(500).json({ ok: false, error: "Error al eliminar el tema" });
  }
};

module.exports = deleteTopic;
