const User = require("../../models/User");
const { paginate } = require("../../helpers/paginationHelper");


const getAdminsTotals = async (req, res) => {
  try {
    const {
      page, 
      limit, 
      sortBy, 
      sortOrder, 
      search 
    } = req.query;

    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      sortBy: sortBy || 'createdAt',
      sortOrder: sortOrder || 'desc',
      search: search || '',
      searchFields: ['name', 'email']
    };

    const query = { admin: true };

    const result = await paginate(User, query, options);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAdminsTotals;