const Topic = require("../../../models/Topics");
const { paginate } = require("../../../helpers/paginationHelper");
const Course = require("../../../models/Courses");
const mongoose = require("mongoose");

const getTopicsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { search, ...filters } = req.filters;

    // Obtener el curso y sus datos
    const course = await Course.findById(courseId)
      .select("topics nameCourse titleCourse typeOfRoute")
      .lean();

    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }

    // Construir la consulta base
    let baseQuery = { _id: { $in: course.topics }, ...filters };
    if (search) {
      baseQuery.nameTopic = { $regex: search, $options: 'i' };
    }



    // Parámetros de paginación
    const { page = 1, limit = 10 } = req.pagination;
    const { sortBy = 'createdAt', sortOrder = 'desc' } = req.sorting;
    const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
    const skip = (page - 1) * limit;

    // Consulta con paginación manual
    const [totalItems, topics] = await Promise.all([
      Topic.countDocuments(baseQuery),
      Topic.find(baseQuery)
        .populate('resources')
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean()
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).send({
      course: {
        nameCourse: course.nameCourse,
        titleCourse: course.titleCourse,
        typeOfRoute: course.typeOfRoute,
      },
      topics,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
        limit: Number(limit)
      }
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send({ error: error.message });
  }
};


module.exports = getTopicsByCourse;
