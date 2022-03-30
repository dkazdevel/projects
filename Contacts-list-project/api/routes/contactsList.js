const express = require('express'),
      router = express.Router(),
      config = require('config'),
      shortId = require('shortid'),
      fs = require('file-system');


router.get('/api/getContacts', (req, res) => res.send(getContactsFromDB()));

router.get('/api/getFoundContacts/:id', (req, res) => {
  const dataToSend = getFoundContactDataFromDB(req.params.id);

  if (!dataToSend) {
    res.sendStatus(400)
  } else res.send(dataToSend);
});

router.get('/api/resetSearch', (req, res) => res.send(resetSearchInfo()));

router.put('/api/getContactData/:id', (req, res) => res.send(getContactDataFromDB(req.params.id)));

router.post('/api/setNewContact', (req, res) => {
  const newContact = req.body,
        existContactsDatabase = getContactsFromDB();

  existContactsDatabase.push(newContact);
  setContactsToDB(existContactsDatabase);

  res.sendStatus(204);
});

router.post('/api/editContact', (req, res) => {
  const newContact = req.body,
        existContactsDatabase = getContactsFromDB(),
        editedDatabase = editContact(newContact, existContactsDatabase);

  setContactsToDB(editedDatabase);

  res.sendStatus(204);
});

router.post('/api/deleteContacts', (req, res) => {
  const contactsToDelete = req.body,
        existContactsDatabase = getContactsFromDB(),
        editedDatabase = deleteContacts(contactsToDelete, existContactsDatabase);

  setContactsToDB(editedDatabase);

  res.sendStatus(204);
});

router.post('/api/setSearchResult', (req, res) => {
  const contactsToSearch = req.body,
        existContactsDatabase = getContactsFromDB(),
        getSearchId = searchContacts(contactsToSearch, existContactsDatabase);

  res.send(JSON.stringify(getSearchId));
});

function getContactsFromDB() {
  checkId();

  return JSON.parse(fs.readFileSync(config.get('database.contactsList'), 'utf8') );
}

function getContactDataFromDB(contactId) {
  const contactsArr = getContactsFromDB();

  const contactToSend = contactsArr.filter(contact => contact.id === contactId)

  return contactToSend;
}

function getFoundContactDataFromDB(searchId) {
  const foundDB = getFoundContactsFromDB(),
        filteredDB = foundDB.filter(searchDB => {
          return searchDB.searchId === searchId;
        })

  if (filteredDB.length === 0) return false;

  const dataToSend = checkIsFoundContactsActual(filteredDB);

  return dataToSend;
}

function checkIsFoundContactsActual(filteredDB) {
  const existContactsDatabase = getContactsFromDB(),
        actualizedData = filterToSearchContacts(filteredDB[0].contactsToSearch, existContactsDatabase);

  filteredDB[0].foundContacts = actualizedData;

  return filteredDB;

}

function checkId() {
  const contactsArr = JSON.parse(fs.readFileSync(config.get('database.contactsList'), 'utf8') );

  contactsArr.map(contact => {
    if (contact.id === "") {
      contact.id = shortId.generate();
      setContactsToDB(contactsArr);
    }
  });
}

function setContactsToDB(contactsData) {
  fs.writeFileSync(config.get('database.contactsList'), JSON.stringify(contactsData));
}

function editContact(newContact, existContactsDatabase) {
  const editedDatabase = existContactsDatabase.map(contact => {
    if (contact.id === newContact.id) {
      return newContact;
    } else return contact;
  })

  return editedDatabase;
}

function deleteContacts(contactsToDelete, existContactsDatabase) {
  const editedDatabase = existContactsDatabase.filter(contact => {
    return !contactsToDelete.includes(contact.id)
  })

  return editedDatabase;
}

function searchContacts(contactsToSearch, existContactsDatabase) {
  const editedDatabase = filterToSearchContacts(contactsToSearch, existContactsDatabase);

    let searchId = shortId.generate();

    const foundContactsDatabase = getFoundContactsFromDB() ? getFoundContactsFromDB() : [],
          newDatabase = {
            'searchId': searchId,
            'contactsToSearch': contactsToSearch,
            'foundContacts': editedDatabase
          };

          foundContactsDatabase.push(newDatabase);

    setNewFoundContactsToDB(foundContactsDatabase);

    return editedDatabase.length ? {'searchId': searchId} : {'searchId': 'NoData'};
}

function filterToSearchContacts(contactsToSearch, existContactsDatabase) {
  const filteredData = existContactsDatabase.filter(contact => {
          let requiredNumToFilter = 0,
              existNumToFilter = 0;

          for (let value in contactsToSearch) {
            if (typeof(contactsToSearch[value]) === 'object') {
              for (let subValue in contactsToSearch[value]) {
                requiredNumToFilter++;
              }
            } else if (value !== 'birthDateLow' && value !== 'birthDateTop') {
                requiredNumToFilter++;
              }

            if (contact[value]) {
              if (typeof(contact[value]) != 'object' && contact[value].toLowerCase() === contactsToSearch[value]) {
                existNumToFilter++;
              } else if (typeof(contact[value]) === 'object') {
                  const objectInContact = contact[value];
                    for (let val in objectInContact) {
                      if (typeof(objectInContact[val]) != 'object' && objectInContact[val].toLowerCase() === contactsToSearch[value][val]) {
                        existNumToFilter++;
                      }
                  }
                }
            } else if (value === 'birthDateLow' || value === 'birthDateTop') {
                requiredNumToFilter++;

                let [days, months, years] = contact['birthDate'].split('/');

                const birthDateLow = contactsToSearch['birthDateLow'] ? new Date(contactsToSearch['birthDateLow']) : new Date('0001-01-01'),
                      birthDateTop = contactsToSearch['birthDateTop'] ? new Date(contactsToSearch['birthDateTop']) : new Date('9999-12-30'),
                      birthDate = new Date(`${years}-${months}-${days}`);
                
                if (birthDate >= birthDateLow && birthDate <= birthDateTop) {
                  existNumToFilter++;
                }
              }
            }

            if (requiredNumToFilter === existNumToFilter) return contact;
    });

    return filteredData;
}

function setNewFoundContactsToDB(foundContacts) {
  fs.writeFileSync(config.get('database.foundContacts'), JSON.stringify(foundContacts));
}

function getFoundContactsFromDB() {
  return JSON.parse(fs.readFileSync(config.get('database.foundContacts'), 'utf8'));
}

function resetSearchInfo() {
  setNewFoundContactsToDB([]);

  return;
}






module.exports = router;
