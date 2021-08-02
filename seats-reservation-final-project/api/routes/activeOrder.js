const express = require('express'),
      router = express.Router(),
      config = require('config'),
      shortId = require('shortid'),
      fs = require('file-system');


router.get('/api/getActiveOrder', (req, res) => res.send(getActiveOrderFromDB()));

router.post('/api/clearActiveOrder', (req, res) => {
  const order = {};
  
  setOrderToDB(order);

	res.sendStatus(204);
});

router.put('/api/orders', (req, res) => {
  const order = req.body;

  order['orderId'] = shortId.generate();
  setOrderToDB(order);

	res.send(order['orderId']);
});

function getActiveOrderFromDB(){
  return JSON.parse(fs.readFileSync(config.get('database.activeOrder'), 'utf8'));
}

function setOrderToDB(orderData) {
  fs.writeFileSync(config.get('database.activeOrder'), JSON.stringify(orderData));
}

module.exports = router;
