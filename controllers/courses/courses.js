const { response } = require("express");
const Course = require("../../models/Courses");

const Courses = async (req, res = response) => {
  try {
    const courses = await Course.find().populate("topic.resources");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = Courses;
