const { updateService } = require("../../services");

const updateFavorite = async (req, res) => {
  const result = await updateService(req);

  res.status(200).json(result);
};

module.exports = updateFavorite;
