const express = require('express'),
      router = express.Router(),
      config = require('config'),
      shortId = require('shortid'),
      fs = require('file-system');


router.get('/api/getSeats', (req, res) => res.send(getSeatsFromDB()));
router.get('/api/concerts', (req, res) => res.send(getConcertsFromDB()));

router.put('/api/seats/:id', (req, res) => {
	const seatsData = getSeatsFromDB();
  const seatsUpd = req.body;
  const seatData = seatsData.find(concertid => concertid.concertId === req.params.id);

    if (seatData === undefined) {
      seatsData.push(seatsUpd);
    } else {
      seatData.seats = seatsUpd.seats;
    }

  setSeatsToDB(seatsData);

	res.sendStatus(204);
});

router.put('/api/updateSeatStatus', (req, res) => {
	const seatsData = getSeatsFromDB(),
  concertsData = getConcertsFromDB(),
  seatsUpdStatus = req.body,
  seatData = seatsData.find(concertid => concertid.concertId === seatsUpdStatus.concertId),
  seatDataSeatsObj = seatData.seats,
  concertData = concertsData.find(concertid => concertid.id === seatsUpdStatus.concertId);

  if (seatsUpdStatus.seatType === 'Танцпол') {
    concertData.seats.danceFloor.booked += seatsUpdStatus.quantity;
    if (concertData.seats.danceFloor.booked === concertData.seats.danceFloor.overall) {
      concertData.seats.danceFloor.status = 'booked';
    }
  } else if (seatsUpdStatus.seatType === 'Стол'){
    concertData.seats.tableSeats.booked += seatsUpdStatus.quantity;

    for (let key in seatDataSeatsObj) {
      if (seatDataSeatsObj[key]['id'] === seatsUpdStatus.seatId) {
        seatDataSeatsObj[key]['status'] = seatsUpdStatus.status;
      }
    }
  }

  setSeatsToDB(seatsData);
  setConcertsToDB(concertsData);

	res.sendStatus(204);
});

function getConcertsFromDB() {
  checkId()

  return JSON.parse(fs.readFileSync(config.get('database.concertsList'), 'utf8') );
}

function setConcertsToDB(concertData) {
  fs.writeFileSync(config.get('database.concertsList'), JSON.stringify(concertData));
}

function checkId() {
  const concertsArr = JSON.parse(fs.readFileSync(config.get('database.concertsList'), 'utf8') );

  concertsArr.map(concert => {
    if (!concert.id) {
      concert['id'] = shortId.generate();
      setConcertsToDB(concertsArr);
    }
  });
}

function getSeatsFromDB() {
  return JSON.parse(fs.readFileSync(config.get('database.tableSeats'), 'utf8'));
}

function setSeatsToDB(concertData) {
  fs.writeFileSync(config.get('database.tableSeats'), JSON.stringify(concertData));
}

module.exports = router;
