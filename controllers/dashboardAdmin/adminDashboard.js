const User = require("../../models/User");
const Course = require("../../models/Courses");
const Resource = require("../../models/Resources");

const getAdminStats = async (req, res) => {
  try {
    const adminCount = await User.countDocuments({ admin: true });
    const studentCount = await User.countDocuments({
      $or: [{ admin: false }, { admin: { $exists: false } }],
    });

    const latestAdmins = await User.find({ admin: true })
      .sort({ _id: -1 }) // usar _id como timestamp
      .limit(2)
      .select("name email createdAt"); // selecciona lo que quieras mostrar

    const latestCourses = await Course.find()
      .sort({ _id: -1 })
      .limit(3)
      .select("nameCourse titleCourse typeOfRoute");

    const resourceCount = await Resource.countDocuments();

    res.status(200).json({
      totalStudents: studentCount,
      totalResources: resourceCount,
      admins: {
        totalAdmins: adminCount,
        latestAdmins,
      },
      latestCourses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAdminStats;
