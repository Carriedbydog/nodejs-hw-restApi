const { Contact } = require("../models/contacts");
const { RequestError } = require("../helpers");

async function updateService(req) {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw RequestError(404);
  }
  return result;
}

module.exports = updateService;
