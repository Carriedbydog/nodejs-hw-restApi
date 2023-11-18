const { Contact } = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);

    if (result) {
      res.status(204).json(result);
    } else {
      throw RequestError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
