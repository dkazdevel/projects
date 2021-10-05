const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
	  fs = require('file-system'),
	  dbFilePathFlights = 'flights.json',
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

app.post('/api/getFlightsList', (req, res) => {
  const requestedFlightsData = req.body,
        resultObj = getSortedFlights(requestedFlightsData);

  res.send(resultObj);
});

function getSortedFlights(requestedFlightsData) {
  const flightData = getFlightsFromDB().result.flights;

  return findFlightsData(flightData, requestedFlightsData)
}

function findFlightsData(flightData, requestedFlightsData) {
  const filtered = [];

  for (let i=0; i < flightData.length; i++) {
    const flightObj = flightData[i].flight.legs[0];

      if (flightObj.segments[0].departureCity.uid == requestedFlightsData.departureCityCode && flightObj.segments[0].departureDate.substr(0,10) == requestedFlightsData.departureDate) {
          const flightSegments = flightObj.segments;

            for (let y=0; y < flightSegments.length; y++) {
              for (let key in flightSegments[y]) {
                if (key == 'arrivalCity' && flightSegments[y][key].uid == requestedFlightsData.arrivalCityCode) {

                  if(!itemExists(filtered, flightData[i])) filtered.push(flightData[i]);
                }
              }
            }
      }
  }
  return filtered;
}

function itemExists(filtered, newObj) {
  for(var i=0; i<filtered.length; i++) if(compareObjects(filtered[i], newObj)) return true;
  return false;
}

function compareObjects(o1, o2) {
  if(o1.flightToken != o2.flightToken) return false;
  return true;
}

function getFlightsFromDB() {
  return JSON.parse(fs.readFileSync(dbFilePathFlights, 'utf8'));
}



app.listen(3000, () => console.log('Server has been started...'));
