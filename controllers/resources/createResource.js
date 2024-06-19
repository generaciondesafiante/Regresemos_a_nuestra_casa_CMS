const { response } = require("express");
const Resource = require("../../models/Resources");

const createResource = async (req, res = response) => {
  try {
    const {
      resourceUrl,
      title,
      description,
      typeResource,
      visibility,
      miniaturaUrl,
    } = req.body;

    const newResource = new Resource({
      resourceUrl,
      title,
      description,
      typeResource,
      visibility,
      miniaturaUrl,
    });

    const savedResource = await newResource.save();
    res.status(201).json(savedResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createResource };
