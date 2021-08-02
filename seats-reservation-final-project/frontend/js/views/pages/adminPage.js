import Component from '../../views/component';

import Admin from '../../models/admin';

import AdminPageTemplate from '../../../templates/pages/admin/adminPage';
import AdminPageFailedTemplate from '../../../templates/pages/admin/adminPageFailed'

class AdminLogin extends Component {
  constructor() {
		super();

		this.model = new Admin();
	}

  getData() {
    return new Promise(resolve => this.model.getLogInStatus().then(data => resolve(data)));
  }

  render(logData) {
    const logInStatus = logData[0];

		return new Promise(resolve => {
      if (logInStatus.status === 'active') {
        resolve(AdminPageTemplate());
      } else {
        resolve(AdminPageFailedTemplate());
      }
		});
  }

  afterRender(logData){
    const logInStatus = logData[0];

    if (logInStatus.status === 'active') {
      this.setActions();
    }
  }

  setActions(){
    const submitAddForm = document.getElementsByClassName('add-form')[0],
    submitRemoveForm = document.getElementsByClassName('remove-form')[0],
    logOutButton = document.getElementsByClassName('info_part__concerts-container__admin-log-out-button')[0];

    submitAddForm.addEventListener('submit', event => {
      event.preventDefault();

      this.submitAddActions(submitAddForm)
    });

    submitRemoveForm.addEventListener('submit', event => {
      event.preventDefault();

      this.submitRemoveActions(submitRemoveForm);
    });

    logOutButton.addEventListener('click', () => {
      this.model.logOut();

      location.hash = '#';
    });
  }

  submitAddActions(submitAddForm){
    const title = document.getElementById('title'),
    date = document.getElementById('date'),
    place = document.getElementById('place'),
    description = document.getElementById('description'),
    imgUrl = document.getElementById('imgUrl'),
    dancefloorDescription = document.getElementById('dancefloorDescription'),
    danceFloorQuantity = document.getElementById('danceFloorQuantity'),
    danceFloorPrice = document.getElementById('danceFloorPrice'),
    tableSeatsDescription = document.getElementById('tableSeatsDescription'),
    tableSeatsQuantity = document.getElementById('tableSeatsQuantity'),
    tableSeatsPrice = document.getElementById('tableSeatsPrice');

    const newConcertData = {
      "id": "",
      "title": title.value,
      "date": date.value,
      "place": place.value,
      "description": description.value,
      "imgUrl": imgUrl.value,
      "seats": {
        "danceFloor": {
          "description": dancefloorDescription.value,
          "price": +danceFloorPrice.value,
          "overall": +danceFloorQuantity.value,
          "booked": 0
        },
        "tableSeats": {
          "description": tableSeatsDescription.value,
          "price": +tableSeatsPrice.value,
          "overall": +tableSeatsQuantity.value,
          "booked": 0
          }
        }
    }

    const inputs = submitAddForm.querySelectorAll('input');
    let counter = 0;

    for (let i=0; i < inputs.length; i++) {
      if (inputs[i].value === '') {
        counter++;
      }
    }

    if (counter === 0) {
      this.model.addConcertData(newConcertData).then( () => {
        this.clearInputs(submitAddForm);
        alert('Concert added');
      });
    } else {
      alert('Not all fields are filled in');
    }
  }

  submitRemoveActions(submitRemoveForm) {
    const concertIDForRemove = document.getElementById('concertId'),
    dataToSend = {
      'id': concertIDForRemove.value
    };

    if (concertIDForRemove.value != '') {
      this.model.removeConcertData(dataToSend).then( () => {
        this.clearInputs(submitRemoveForm);
        alert('The concert was deleted');
      });
    } else {
      alert('Not all fields are filled in');
    }
  }

  clearInputs(form){
    const inputs = form.querySelectorAll('input');

    for (let i=0; i < inputs.length; i++) {
      inputs[i].value = '';
    }
  }
}

export default AdminLogin;
