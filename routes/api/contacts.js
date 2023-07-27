const express = require('express')
const Joi = require('joi');

const router = express.Router()
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, '../../models/contacts.json');

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern('^[A-Z][a-z]+ [A-Z][a-z]+$')
    .message('Name must be in format: FirstName LastName')    
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string()    
    .pattern('^[0-9]{3}-[0-9]{3}-[0-9]{4}$')
    .message('Phone number must be in format: 000-000-0000')
    .required(),
});

function readContactsFromFile() {
  return JSON.parse(fs.readFileSync(contactsPath));
}

function writeContactsToFile(contacts) {
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
}

router.get('/', async (req, res) => {
    const contacts = readContactsFromFile();
    res.json(contacts);
})

router.get('/:contactId', async (req, res) => {
  const contacts = readContactsFromFile();
  const contact = contacts.find((c) => c.id === req.params.contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json(contact);
})

router.post('/', async (req, res) => {  

   const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, phone } = req.body;

  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  const contacts = readContactsFromFile();
  contacts.push(newContact);
  writeContactsToFile(contacts);

  res.status(201).json(newContact);
})

router.delete('/:contactId', async (req, res) => {
  const contacts = readContactsFromFile();
  const index = contacts.findIndex((c) => c.id === req.params.contactId);

  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  contacts.splice(index, 1);
  writeContactsToFile(contacts);

  res.json({ message: 'contact deleted' });
})

router.put('/:contactId', async (req, res) => {  

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, phone } = req.body;
  
  const contacts = readContactsFromFile();
  const index = contacts.findIndex((c) => c.id === req.params.contactId);

  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  const updatedContact = {
    id: req.params.contactId,
    name,
    email,
    phone,
  };

  contacts[index] = updatedContact;
  writeContactsToFile(contacts);

  res.json(updatedContact);
})

module.exports = router
