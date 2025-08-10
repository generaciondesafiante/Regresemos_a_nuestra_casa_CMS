const Course = require("../../models/Courses");

const getCourses = async (req, res) => {
  try {
    const { search, limit, page } = req.query;

    // Verificar que limit y page sean proporcionados
    if (limit === undefined || page === undefined) {
      return res.status(400).send({
        error: "Los parámetros 'limit' y 'page' son obligatorios."
      });
    }

    // Convertir limit y page a números
    const limitNumber = parseInt(limit, 10);
    const pageNumber = parseInt(page, 10);

    // Validar que limit y page sean números positivos
    if (isNaN(limitNumber) || isNaN(pageNumber) || limitNumber <= 0 || pageNumber <= 0) {
      return res.status(400).send({
        error: "Los parámetros 'limit' y 'page' deben ser números positivos."
      });
    }

    // Configurar el filtro de búsqueda
    const filter = search ? { nameCourse: { $regex: search, $options: 'i' } } : {};

    // Obtener los cursos con paginación
    const courses = await Course.find(filter)
      .limit(limitNumber)
      .skip((pageNumber - 1) * limitNumber)
      .sort({ nameCourse: 1 });

    // Obtener el total de cursos para la paginación
    const totalCourses = await Course.countDocuments(filter);
    const totalPages = Math.ceil(totalCourses / limitNumber);

    // Determinar si hay páginas anteriores o siguientes
    const hasPreviousPage = pageNumber > 1;
    const hasNextPage = pageNumber < totalPages;

    res.status(200).send({
      courses,
      pagination: {
        totalCourses,
        totalPages,
        currentPage: pageNumber,
        hasPreviousPage,
        hasNextPage,
      },
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getCourses;
