const User = require("../../models/User");
const mongoose = require("mongoose");

const findStudent = async (req, res) => {
  try {
    const { searchTerm } = req.params;

    const isMongoId = mongoose.Types.ObjectId.isValid(searchTerm);

    const query = {
      $or: [{ admin: false }, { admin: { $exists: false } }],
    };

    if (isMongoId) {
      query._id = searchTerm;
    } else {
      query.email = { $regex: new RegExp(`^${searchTerm}$`, 'i') };
    }

    const user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = findStudent;
