// middlewares/queryParser.js
const queryParser = (req, res, next) => {
    // Paginación
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    
    // Ordenamiento
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'desc';
    
    // Búsqueda
    const search = req.query.search || '';
  
    // Otros filtros
    const { page: p, limit: l, sortBy: sb, sortOrder: so, search: s, ...filters } = req.query;
  
    req.pagination = { page, limit };
    req.sorting = { sortBy, sortOrder };
    req.filters = { search, ...filters };
  
    next();
  };
  
  module.exports = queryParser;