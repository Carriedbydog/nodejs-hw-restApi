const { User } = require("../../models/user");

const subscription = async (req, res) => {
  const userId = req.user.id;
  const { subscription } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { subscription },
    { new: true }
  );
  res.json(user);
};

module.exports = subscription;
