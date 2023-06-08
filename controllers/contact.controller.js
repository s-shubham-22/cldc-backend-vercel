const { Contact } = require('../models');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(201).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    await contact.update(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    await contact.destroy();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteContacts = async (req, res) => {
  try {
    const contacts = await Contact.destroy({ where: {} });
    res.status(201).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
