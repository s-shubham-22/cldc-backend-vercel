const { Contact } = require('../models');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(201).json(contacts);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
};

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error('Contact not found');
    }

    res.status(201).json(contact);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
};

exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error('Contact not found');
    }

    await contact.update(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error('Contact not found');
    }

    await contact.destroy();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
};

exports.deleteContacts = async (req, res) => {
  try {
    const contacts = await Contact.destroy({ where: {} });
    res.status(201).json(contacts);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
};
