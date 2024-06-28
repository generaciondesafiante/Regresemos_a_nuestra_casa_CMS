const { response } = require("express");
const Course = require("../../models/Courses");

const Courses = async (req, res = response) => {
  try {
    const courses = await Course.find().populate({
      path: "topic.resources",
      populate: {
        path: "_id", 
      },
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = Courses;
