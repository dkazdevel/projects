class Flights {
  getFlightsList(requestedFlights) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', 'http://localhost:3000/api/getFlightsList');
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => resolve(JSON.parse(xhr.response));

      xhr.send(JSON.stringify(requestedFlights));
    });
  }

}

export default Flights;
