const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      config = require('config'),
      app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(
  require(config.get('routes.concertsList')),
  require(config.get('routes.activeOrder')),
  require(config.get('routes.confirmedOrders')),
  require(config.get('routes.emails')),
  require(config.get('routes.admin'))
);


app.listen(3000, () => console.log('Server has been started...'));
