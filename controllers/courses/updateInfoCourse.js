const { response } = require("express");
const Course = require("../../models/Courses");

const updateInfoCurse = async (req, res = response) => {
  const { courseId } = req.params;
  const updates = req.body;

  try {
    const course = await Course.findByIdAndUpdate(courseId, updates, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).send("Course not found");
    }

    res.status(200).send(course);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating course");
  }
};

module.exports = updateInfoCurse;
