const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const resizeAvatar = async (filename) => {
  const avatarPath = path.join(avatarsDir, filename);

  const image = await Jimp.read(avatarPath);

  await image.resize(250, 250);

  await image.writeAsync(avatarPath);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;

  const extention = originalname.split(".").pop();

  const filename = `${_id}.${extention}`;

  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);

  await resizeAvatar(filename);

  const avatarURL = path.join("avatars", filename).replace(/\\/g, "/");

  await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
