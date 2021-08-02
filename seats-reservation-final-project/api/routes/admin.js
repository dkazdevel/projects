const express = require('express'),
      router = express.Router(),
      config = require('config'),
      shortId = require('shortid'),
      fs = require('file-system');

router.post('/api/login', (req, res) => {
  const loginData = req.body,
  adminData = getSessionStatusFromDB();
  let answer;

    if (loginData.login === adminData.login && loginData.password === adminData.password) {
      answer = 'Succeed';
      sendSessionStatusToDB('active');
    } else {
      answer = 'Failed';
    }
    
	res.send(answer);
});

router.delete('/api/admin/removeConcert/:id', (req, res) => {
  const concertsData = getConcertsFromDB(),
  tableSeatsData = getTableSeatsInfoFromDB(),
  updatedConcertsData = concertsData.filter(concert => concert.id !== req.params.id),
  updatedTableSeatsData = tableSeatsData.filter(concert => concert.concertId !== req.params.id);

  setConcertsToDB(updatedConcertsData);
  setTableSeatsInfoToDB(updatedTableSeatsData);

  res.sendStatus(204);
});

router.put('/api/admin/addConcert', (req, res) => {
  const concertsData = getConcertsFromDB(),
  newConcertData = req.body;

  newConcertData.id = shortId.generate();
  concertsData.push(newConcertData);

  setConcertsToDB(concertsData);

	res.sendStatus(204);
});

router.post('/api/admin/logOut', (req, res) => {
  sendSessionStatusToDB('unactive');

	res.sendStatus(204);
});

router.get('/api/admin/getLogInStatus', (req, res) => res.send(getSessionStatusFromDB()));

function sendSessionStatusToDB(status) {
  const statusData = getSessionStatusFromDB();

  statusData.status = status;
  setSessionStatusToDB(statusData);
}

function getConcertsFromDB() {
  return JSON.parse(fs.readFileSync(config.get('database.concertsList'), 'utf8') );
}

function setConcertsToDB(concertData) {
  fs.writeFileSync(config.get('database.concertsList'), JSON.stringify(concertData));
}

function getTableSeatsInfoFromDB() {
  return JSON.parse(fs.readFileSync(config.get('database.tableSeats'), 'utf8') );
}

function setTableSeatsInfoToDB(concertData) {
  fs.writeFileSync(config.get('database.tableSeats'), JSON.stringify(concertData));
}

function getSessionStatusFromDB() {
  return JSON.parse(fs.readFileSync(config.get('database.adminSession'), 'utf8') );
}

function setSessionStatusToDB(statusData) {
  fs.writeFileSync(config.get('database.adminSession'), JSON.stringify(statusData));
}

module.exports = router;
