const Topic = require("../../../models/Topics");
const Resource = require("../../../models/Resources");

const getTopicById = async (req, res) => {
  try {
    const { topicId } = req.params;
    if (!topicId) {
      return res.status(400).send({ error: "Topic ID is required" });
    }

    const { page = 1, limit = 10 } = req.pagination || req.query;
    const numericPage = Number(page);
    const numericLimit = Number(limit);

    const topic = await Topic.findById(topicId).lean();
    if (!topic) {
      return res.status(404).send({ error: "Topic not found" });
    }

    // Lista original de wrappers con _id y flags
    const resourceWrappers = topic.resources || [];
    console.log(`Resource Wrappers: ${JSON.stringify(resourceWrappers)}`);
    // Traemos todos los recursos existentes para obtener conteo real
    const allResourceIds = resourceWrappers.map((w) => w._id);
    const allExistingResources = await Resource.find({ _id: { $in: allResourceIds } })
      .select("title typeResource")
      .lean();

    const resourcesMap = allExistingResources.reduce((acc, res) => {
      acc[res._id.toString()] = res;
      return acc;
    }, {});

    // Filtramos wrappers que realmente existen en la colección Resource
    const validResourceWrappers = resourceWrappers.filter((w) => resourcesMap[w._id.toString()]);

    const totalItems = validResourceWrappers.length;
    const totalPages = Math.ceil(totalItems / numericLimit) || 1;

    const startIndex = (numericPage - 1) * numericLimit;
    const endIndex = numericPage * numericLimit;

    const paginatedResources = validResourceWrappers
      .slice(startIndex, endIndex)
      .map((w) => resourcesMap[w._id.toString()]);

    const responseTopic = {
      _id: topic._id,
      nameTopic: topic.nameTopic,
      resources: paginatedResources,
    };

    res.status(200).send({
      topic: responseTopic,
      pagination: {
        totalItems,
        totalPages,
        currentPage: numericPage,
        hasPreviousPage: numericPage > 1,
        hasNextPage: numericPage < totalPages,
        limit: numericLimit,
      },
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send({ error: error.message });
  }
};



module.exports = getTopicById;
