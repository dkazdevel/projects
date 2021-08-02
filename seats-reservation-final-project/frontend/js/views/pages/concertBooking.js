import {parseRequestURL} from '../../helpers/utils'

import Component from '../../views/component';

import Concerts from '../../models/concerts';

import Error404Template from '../../../templates/pages/error404';

class ConcertBooking extends Component {
	constructor() {
		super();

		this.model = new Concerts();
	}

  getData() {
    return new Promise(resolve => this.model.getConcertList().then(data => resolve(data)));
  }

  getConcertSeatsData() {
    return new Promise(resolve => this.model.getConcertSeats().then(seats => resolve(seats)));
  }

  render(concerts) {
		return new Promise(resolve => {
			if (concerts[0].find(concert => concert.id === this.getConcertId())) {
				resolve(`
		      <div class="info_part__concerts-container">
						<a href="#/concerts" class="info_part__concerts-container__button-mobile">
						Back to the concert
						</a>
		        <div class="info_part__concerts-container__h1-concert-book">${this.getConcertData(concerts, 'title')}</div>
		        <div class="info_part__concerts-container__place-date-book">
		          <h3 class="info_part__concerts-container__place-date__place-concert-book">${this.getConcertData(concerts, 'place')}</h3><br>
		          <h3 class="info_part__concerts-container__place-date__place-concert-book">${this.getConcertData(concerts, 'date')}</h3>
		        </div>
		        <div class="info_part__concerts-container__booking-choose-block">
		          <h2>Scene</h2>
		          <div id="dance-floor" class="${this.isDanceFloorActive(concerts)} info_part__concerts-container__booking-choose-block__danceFloor concert-dance-floor" data-state="free">Dance floor</div>
		          <div class="info_part__concerts-container__booking-choose-block__tableSeats">
		              ${this.getTablesHtml(concerts)}
		          </div>
		        </div>
		        <div class="info_part__concerts-container__booking-form-block">
		          <h1 class="info_part__concerts-container__booking-form-block__h1">Your choice:</h3>
		          <div class="info_part__concerts-container__booking-form-block__order-info order-container">
		          </div>
		        </div>
		      </div>
		    `);
			} else {
				resolve(Error404Template());
			}
		});
  }

	afterRender(concertsData) {
		if (concertsData[0].find(concert => concert.id === this.getConcertId())) {
			this.setActions(concertsData);
		}
	}

  setActions(concertsData) {
    const tableSeatsContainer = document.getElementsByClassName('concert-table-seats'),
    danceFloorContainer = document.getElementsByClassName('concert-dance-floor')[0],
    seatsContainer = document.getElementsByClassName('info_part__concerts-container__booking-choose-block')[0];

    seatsContainer.addEventListener('click', event => {
      const target = event.target,
      targetClassList = event.target.classList,
      targetId = event.target.id;
      let seatType;

      switch(true) {
        case targetClassList.contains('concert-dance-floor'):
          seatType = 'Танцпол';

          this.addClassListChoosed(target, tableSeatsContainer, targetClassList, danceFloorContainer);
          this.addDanceFloorInfo(concertsData,targetId, seatType);
          break;

        case targetClassList.contains('concert-table-seats'):
          seatType = 'Стол';

          this.addClassListChoosed(target, tableSeatsContainer, targetClassList, danceFloorContainer);
          this.addTableSeatsInfo(concertsData, targetId, seatType);
          break;
				}
			});
		}

	addClassListChoosed(target, tableSeatsContainer, targetClassList, danceFloorContainer){
		for (let i=0; i<tableSeatsContainer.length; i++){

			if (tableSeatsContainer[i] == target){
				if (!tableSeatsContainer[i].classList.contains('booked')) {
					target.classList.add('choosed');
					target.dataset.state='choosed';
				}
			} else {
				tableSeatsContainer[i].dataset.state='free';
				tableSeatsContainer[i].classList.remove('choosed');
			}
		}

		if (targetClassList.contains('concert-dance-floor')) {
			if (!danceFloorContainer.classList.contains('booked')) {
				target.dataset.state='choosed';
				targetClassList.add('choosed');
			}
		} else {
			danceFloorContainer.classList.remove('choosed');
			danceFloorContainer.dataset.state='free';
		}
	}

	addDanceFloorInfo(concertsData, targetId, seatType){
		const orderContainer = document.getElementsByClassName('order-container')[0],

		targetBlock = document.getElementById(`${targetId}`);
		orderContainer.innerHTML = this.getDanceFloorOrderHTML(concertsData);

		if (!targetBlock.classList.contains('booked')) {
			this.setConfirmButtonAction(concertsData,targetId, seatType);
		}
	}

	addTableSeatsInfo(concertsData, targetId, seatType){
		const targetBlock = document.getElementById(`${targetId}`),
		orderContainer = document.getElementsByClassName('order-container')[0];

		orderContainer.innerHTML = this.getTablesOrderHTML(concertsData, targetId, targetBlock);

		if (!targetBlock.classList.contains('booked')) {
			this.setConfirmButtonAction(concertsData,targetId, seatType);
		}
	}

	getDanceFloorOrderHTML(concertsData) {
		let seats = this.getConcertData(concertsData, 'seats'),
		description = seats.danceFloor.description,
		price = seats.danceFloor.price,
		overallSeats = seats.danceFloor.overall,
		bookedSeats = seats.danceFloor.booked;

		if (overallSeats === bookedSeats) {
			return `
			<h2 class="info_part__concerts-container__booking-form-block__order-info__seat-type">Oops, all the seats on the dance floor are booked</h2>
			`
		} else {
			return `<h2 class="info_part__concerts-container__booking-form-block__order-info__seat-type">Dance floor</h2>
							<h2 class="info_part__concerts-container__booking-form-block__order-info__seat-description">${description}</h2>
							<h2 class="info_part__concerts-container__booking-form-block__order-info__seat-price">Price: ${price} zł</h2>
							<h2 class="info_part__concerts-container__booking-form-block__order-info__seat-free-seats">Available: ${overallSeats - bookedSeats}</h2>
							<div class="info_part__concerts-container__booking-form-block__order-info__button confirm-button">
							Book
							</div>`
			}
	}

	getTablesOrderHTML(concertsData, targetId, targetBlock) {
		let seats = this.getConcertData(concertsData, 'seats'),
		description = seats.tableSeats.description,
		price = seats.tableSeats.price,
		overallSeats = seats.tableSeats.overall,
		bookedSeats = seats.tableSeats.booked;

		if (targetBlock.classList.contains('booked')) {
			return `<h2 class="info_part__concerts-container__booking-form-block__order-info__seat-type">Oops, the table is already booked</h2>`
		} else {
			return `<h2 class="info_part__concerts-container__booking-form-block__order-info__seat-type">Table № ${targetId.slice(0,2)}</h2>
							<h2 class="info_part__concerts-container__booking-form-block__order-info__seat-description">${description}</h2>
							<h2 class="info_part__concerts-container__booking-form-block__order-info__seat-price">Price: ${price} zł</h2>
							<h2 class="info_part__concerts-container__booking-form-block__order-info__seat-free-seats">Tables available: ${overallSeats - bookedSeats}</h2>
							<div class="info_part__concerts-container__booking-form-block__order-info__button confirm-button">
							Book
							</div>`
		}
	}

	setConfirmButtonAction(concertsData, targetId, seatType) {
	const confirmOrderButton = document.getElementsByClassName('confirm-button')[0];

    confirmOrderButton.addEventListener('click', () => {
      this.setActiveOrderInfo(concertsData, targetId, seatType);
    });
  }

  setActiveOrderInfo(concertsData,targetId, seatType) {
    let concertId = this.getConcertData(concertsData, 'id'),
    orderTitle = this.getConcertData(concertsData, 'title'),
    orderPlace = this.getConcertData(concertsData, 'place'),
    orderDate = this.getConcertData(concertsData, 'date'),
    seatsData = this.getConcertData(concertsData, 'seats'),
    price;

    seatType === 'Танцпол' ? price = seatsData.danceFloor.price : price = seatsData.tableSeats.price;

    const activeOrderObj = {
      'concertId': concertId,
      'concertTitle': orderTitle,
      'price': price,
      'concertPlace': orderPlace,
      'concertDate': orderDate,
      'seatType': seatType,
      'seatId': targetId,
      'seatsData': seatsData
    };

    this.model.addActiveOrderInfo(activeOrderObj).then(orderId => this.redirectToOrderConfirmation(orderId));
  }

  redirectToOrderConfirmation(orderId) {
    let concertId = this.getConcertId();

    location.hash = `#/concerts/${concertId}/${orderId}/confirm`;
  }

  isDanceFloorActive(concerts){
    const danceFloorSeats = this.getConcertData(concerts, 'seats');

    if (danceFloorSeats.danceFloor.overall === danceFloorSeats.danceFloor.booked) {
      return 'booked';
    } else return 'free';
  }

  getConcertData(concerts, requestedData){
    let concertId = this.getConcertId(),
    concertData;

    concerts[0].forEach(concert => {
      if (concert.id === concertId) {
        concertData = concert[requestedData];
      }
    });

    return concertData;
    }

  getConcertId(){
    const request = parseRequestURL();

    return request.concertId;
  }

  getSeats(seatsData){
    let seatsIdData,
    concertId = this.getConcertId();

    if (seatsData.find(concertSeats => concertSeats.concertId === concertId)) {
      seatsIdData = seatsData.find(concertSeats => concertSeats.concertId === concertId);
    } else {
      seatsIdData = {'concertId': concertId};
    }

    return seatsIdData;
  }

  getTablesHtml(concerts){
    const seatsData = this.getConcertData(concerts, 'seats'),
    concertIds = this.getSeats(concerts[1]),
		concertIdFromData = this.getConcertData(concerts, 'id'),
		concertSeats = concerts[1],
    html = [],
    seatsObj = {};

    for (let i = 0; i< seatsData.tableSeats.overall; i++) {
      seatsObj[i] = {'id': this.getShortId(concertIds, i), 'status': this.getStatus(concertIds, i)};
      html[i] = `<div id="${seatsObj[i].id}"class="${this.getStatusClass(seatsObj[i])} info_part__concerts-container__booking-choose-block__tableSeats__block concert-table-seats">Table</div>`;
    }

    concertIds['seats'] = seatsObj;

		try {
			if (!concertSeats.find(concertData => concertData.concertId === concertIdFromData)) {
				throw 'There is no concert data';
			}
		} catch(e) {
			this.model.addConcertSeats(concertIds);
		}

    return html.join('\n ');
  }

  getStatusClass(requestedSeat){
    if (requestedSeat.status === 'booked') {
      return 'booked';
    } else
    return 'free';
  }

  getStatus(concertSeats, idPlace){
    if (!concertSeats.seats){
      return 'free';
    } else {
      if (concertSeats.seats[idPlace].status === 'free'){
        return 'free';
      } else return 'booked';
    }
  }

  getShortId(concertSeats, idPlace){
    if (!concertSeats.seats) {
      return Math.random().toString(36).substr(2, 10);
    } else {
      return concertSeats.seats[idPlace].id;
    }
  }
}

export default ConcertBooking;
