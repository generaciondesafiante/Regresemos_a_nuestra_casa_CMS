const { response } = require("express");
const Resource = require("../../models/Resources");
const User = require("../../models/User");
const { paginate } = require("../../helpers/paginationHelper");

const allResources = async (req, res = response) => {
  const { userId } = req.params;
  const { search, ...filters } = req.filters;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Construir query base
    const query = { ...filters };
    if (!user.admin) {
      query.visibility = "public";
    }

    // Usar el helper de paginación
    const { items: resources, pagination } = await paginate(Resource, query, {
      ...req.pagination,
      ...req.sorting,
      search,
      searchFields: ['title', 'description'] // campos donde buscar
    });

    res.status(200).json({
      ok: true,
      resources,
      pagination
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error en el servidor",
    });
  }
};

module.exports = allResources;