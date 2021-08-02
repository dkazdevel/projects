const express = require('express'),
      router = express.Router(),
      config = require('config'),
      fs = require('file-system');


router.post('/api/confirmedOrders', (req, res) => {
  const newConfirmedOrder = req.body;
  const confirmedOrderData = getConfirmedOrdersFromDB();

  confirmedOrderData.push(newConfirmedOrder);

  setConfirmedOrderToDB(confirmedOrderData);

	res.sendStatus(204);
});

function getConfirmedOrdersFromDB(){
  return JSON.parse(fs.readFileSync(config.get('database.confirmedOrders'), 'utf8'));
}

function setConfirmedOrderToDB(confirmedOrderData) {
  fs.writeFileSync(config.get('database.confirmedOrders'), JSON.stringify(confirmedOrderData));
}

module.exports = router;
