class Admin {
  authenticateUser(userData) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', `http://localhost:3000/api/login`);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => resolve(xhr.response);

      xhr.send(JSON.stringify(userData));
    });
  }

  addConcertData(newConcertData) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('PUT', `http://localhost:3000/api/admin/addConcert`);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => resolve();

      xhr.send(JSON.stringify(newConcertData));
    });
  }

  logOut() {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', `http://localhost:3000/api/admin/logOut`);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => resolve();

      xhr.send();
    });
  }

  removeConcertData(concertForRemove) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('DELETE', `http://localhost:3000/api/admin/removeConcert/${concertForRemove.id}`);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => resolve();

      xhr.send(JSON.stringify(concertForRemove));
    });
  }

  getLogInStatus() {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', `http://localhost:3000/api/admin/getLogInStatus`);

      xhr.onload = () => resolve(JSON.parse(xhr.response));

      xhr.send();
    });
  }
  
}

export default Admin;
