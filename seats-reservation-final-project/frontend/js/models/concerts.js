class Concerts {
  getConcertList() {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', 'http://localhost:3000/api/concerts');

      xhr.onload = () => resolve(JSON.parse(xhr.response));

      xhr.send();
    });
  }

  getConcertSeats() {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', 'http://localhost:3000/api/getSeats');

      xhr.onload = () => resolve(JSON.parse(xhr.response));

      xhr.send();
    });
  }

  getActiveOrderInfo() {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', 'http://localhost:3000/api/getActiveOrder');

      xhr.onload = () => resolve(JSON.parse(xhr.response));

      xhr.send();
    });
  }

  addConcertSeats(seats) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('PUT', `http://localhost:3000/api/seats/${seats.concertId}`);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => resolve();

      xhr.send(JSON.stringify(seats));
    });
  }

  addActiveOrderInfo(order) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('PUT', `http://localhost:3000/api/orders`);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => resolve(xhr.response);

      xhr.send(JSON.stringify(order));
    });
  }

  addConfirmedOrders(order) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', `http://localhost:3000/api/confirmedOrders`);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => resolve();

      xhr.send(JSON.stringify(order));
    });
  }

  updateSeatsStatus(updatedSeatsStatus) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('PUT', `http://localhost:3000/api/updateSeatStatus`);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => resolve();

      xhr.send(JSON.stringify(updatedSeatsStatus));
    });
  }

  sendEmail(contactEmail){
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', `http://localhost:3000/api/sendEmailToOffice`);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => resolve();

      xhr.send(JSON.stringify(contactEmail));
    });
  }

  sendEmailToCustomer(emailObj){
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', `http://localhost:3000/api/sendEmailToCustomer`);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => resolve();

      xhr.send(JSON.stringify(emailObj));
    });
  }
  clearActiveOrder() {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', `http://localhost:3000/api/clearActiveOrder`);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => resolve();

      xhr.send();
    });
  }
}

export default Concerts;
