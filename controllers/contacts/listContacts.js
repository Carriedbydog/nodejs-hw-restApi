const { Contact } = require("../../models/contacts");

const listContacts = async (req, res) => {
  try {
    const { _id: owner } = req.user;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    const favorite = req.query.favorite;
    const filter = { owner };
    if (favorite !== undefined) {
      filter.favorite = favorite;
    }

    const query = Contact.find(filter)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);
    const contacts = await query.exec();

    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = listContacts;
