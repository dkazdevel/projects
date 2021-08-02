import Component from '../../views/component';

import Concerts from '../../models/concerts';

import OrderConfirmActiveTemplate from '../../../templates/pages/concerts/orderConfirmActive';
import OrderConfirmDisabledTemplate from '../../../templates/pages/concerts/orderConfirmDisabled';
import OrderConfirmSucceedTemplate from '../../../templates/pages/concerts/orderConfirmSucceed';

class OrderConfirmation extends Component {

  constructor() {
		super();

		this.model = new Concerts();
	}

  getData() {
    return new Promise(resolve => this.model.getActiveOrderInfo().then(data => resolve(data)));
  }

  render(data) {
    const activeOrder = data[0];

    return new Promise(resolve => {
      if(activeOrder.orderId) {
        resolve(OrderConfirmActiveTemplate({activeOrder}));
      } else {
        resolve(OrderConfirmDisabledTemplate());
      }
    });
  }

  afterRender(data){
    const concertsData = data[0];

    if(concertsData.orderId) {
      this.setActions(concertsData);
    }
  }

  setActions(concertsData) {
    const quantityInput = document.getElementById('quantity'),
    userNameInput = document.getElementById('userName'),
    userEmail = document.getElementById('userEmail'),
    userTel = document.getElementById('userTel'),
    orderTotalPrice = document.getElementsByClassName('h2__totalPrice')[0],
    submitForm = document.getElementsByClassName('info_part__concerts-container__order-info-container__form')[0];

    quantityInput.addEventListener('change', () => {
      if (!Number.isInteger(+quantityInput.value) || +quantityInput.value > 10) {
        orderTotalPrice.textContent = '';
        quantityInput.value ='';
        alert('Please enter an integer. The maximum possible number of reserved tickets should not exceed 10');
      } else if (quantityInput.value != ''){

        if (concertsData.seatType === 'Танцпол' && +quantityInput.value > (concertsData.seatsData.danceFloor.overall - concertsData.seatsData.danceFloor.booked)) {
          orderTotalPrice.textContent = '';
          quantityInput.value ='';
          alert(`Already booked ${concertsData.seatsData.danceFloor.booked} of ${concertsData.seatsData.danceFloor.overall} available seats. Please select the maximum number of tickets: ${concertsData.seatsData.danceFloor.overall - concertsData.seatsData.danceFloor.booked}`);
        } else {
        this.calculateTotalPrice(orderTotalPrice, concertsData.price, quantityInput.value);
        }
      }

      this.submitButtonIsActive(quantityInput, userNameInput, userEmail, userTel);
    });

    userNameInput.addEventListener('change', () => {
      if (!(/^([а-яё]|[a-z]){2,15}$/i.test(userNameInput.value)) && userNameInput.value.length > 0) {
        userNameInput.value ='';

        alert('Please enter the correct name');
      }

      this.submitButtonIsActive(quantityInput, userNameInput, userEmail, userTel);
    });

    userEmail.addEventListener('change', () => {
      if (!(/^([a-z]|\d|\_|\-|\.){3,20}@[a-z\d]{1,10}\.[a-z]{2,4}$/i.test(userEmail.value)) && userEmail.value.length > 0) {
        userEmail.value ='';

        alert('Please enter a valid email address');
      }

      this.submitButtonIsActive(quantityInput, userNameInput, userEmail, userTel);
    });

    userTel.addEventListener('change', () => {
      if (!(/^\+?[\d]{5,9}$/i.test(userTel.value)) && userTel.value.length > 0) {
        userTel.value ='';

        alert('Please enter the correct number');
      }

      this.submitButtonIsActive(quantityInput, userNameInput, userEmail, userTel);
    });

    submitForm.addEventListener('submit', event => {
      event.preventDefault();

      if (quantityInput.value != '' && userNameInput.value != '' && userEmail.value != '' && userTel.value != '') {
        this.submitFormActions(concertsData, orderTotalPrice, quantityInput, userNameInput, userEmail, userTel);
      } else {
        alert('Please fill in all the fields')
      }
    });
  }

  calculateTotalPrice(orderTotalPrice, startPrice, quantity) {
    orderTotalPrice.textContent = `Общая цена: ${startPrice * (+quantity)}zł`
  }

  submitButtonIsActive(quantityInput, userNameInput, userEmail, userTel){
    const submitButton = document.getElementsByClassName('info_part__concerts-container__order-info-container__form__button-confirm')[0];

    if (quantityInput.value != '' && userNameInput.value != '' && userEmail.value != '' && userTel.value != '') {
      submitButton.classList.add('submit-button-active');
    } else {
      submitButton.classList.remove('submit-button-active');
    }
  }

  submitFormActions(concertsData, orderTotalPrice, quantityInput, userNameInput, userEmail, userTel) {
    const newConfirmedOrder = {
      'concertId': concertsData.concertId,
      'orderId': concertsData.orderId,
      'title': concertsData.concertTitle,
      'date': concertsData.concertDate,
      'place': concertsData.concertPlace,
      'seatType': concertsData.seatType,
      'seatId': concertsData.seatId,
      'price': concertsData.price,
      'totalPrice': +orderTotalPrice.textContent.slice(0, -2).substr(12),
      'quantity': +quantityInput.value,
      'userName': userNameInput.value,
      'userEmail': userEmail.value,
      'userTel': userTel.value
    }

    const infoForUpdate = {
      'concertId': newConfirmedOrder.concertId,
      'seatType': newConfirmedOrder.seatType,
      'seatId': newConfirmedOrder.seatId,
      'quantity': newConfirmedOrder.quantity,
      'status': 'booked'
    }

    this.model.updateSeatsStatus(infoForUpdate);
    this.model.addConfirmedOrders(newConfirmedOrder);
    this.model.clearActiveOrder();
    this.onPopState();
    this.rebuildHTML(newConfirmedOrder);
    this.model.sendEmailToCustomer(newConfirmedOrder);
  }

  onPopState() {
    history.pushState({page: 1, title: "ConcertList"}, "", "#/concerts");
    history.pushState({page: 2, title: "Main"}, "", "#");
    history.replaceState({page: 3, title: "Booked"}, "", "#concerts/booked");
  }

  rebuildHTML() {
    const confirmationFormContainer = document.getElementsByClassName('info_part__concerts-container__order-info-container')[0];

    confirmationFormContainer.innerHTML= this.getReBuildedHTML();
  }

  getReBuildedHTML(){
    return OrderConfirmSucceedTemplate();
  }

}

export default OrderConfirmation;
