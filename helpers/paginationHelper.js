// helpers/paginationHelper.js
const paginate = async (Model, query = {}, options = {}) => {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search = '',
      searchFields = ['name'], // campos donde buscar por defecto
      ...filters
    } = options;
  
    // Configurar ordenamiento
    const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
    
    // Calcular skip
    const skip = (page - 1) * limit;
  
    // Construir query de búsqueda
    const searchQuery = {};
    if (search && searchFields.length > 0) {
      searchQuery.$or = searchFields.map(field => ({
        [field]: { $regex: search, $options: 'i' }
      }));
    }
  
    // Combinar con filtros adicionales
    const finalQuery = { ...query, ...searchQuery, ...filters };
  
    // Ejecutar consultas en paralelo
    const [total, items] = await Promise.all([
      Model.countDocuments(finalQuery),
      Model.find(finalQuery)
        .sort(sortOptions)
        .limit(limit)
        .skip(skip)
        .lean()
    ]);
  
    // Calcular metadatos de paginación
    const totalPages = Math.ceil(total / limit);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;
  
    return {
      items,
      pagination: {
        totalItems: total,
        totalPages,
        currentPage: page,
        hasPreviousPage,
        hasNextPage,
        limit: Number(limit)
      }
    };
  };
  
  module.exports = { paginate };