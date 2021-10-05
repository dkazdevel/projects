import Component from '../../views/component';

import Flights from '../../models/flights';

class SearchResult extends Component {
	constructor() {
		super();

		this.model = new Flights();
	}

	getData() {
		const requestedFlights = {
			'departureCityCode': 'MOW',
			'arrivalCityCode': 'LON',
			'departureDate': '2020-08-18'
		}

    return new Promise(resolve => this.model.getFlightsList(requestedFlights).then(data => resolve(data)));
  }

  render(flightsList) {
		return new Promise(resolve => {

				resolve(`
		      <div class="content-container__left-part">
						<div class="content-container__left-part__sort-filters-container">
							<form id="price-time-sort-form" class="content-container__left-part__sort-filters-container__form price-time-sort-form">
								<h2 class="content-container__left-part__sort-filters-container__form__h2">Сортировать</h2>
								<input id="priceTopSort" class="priceTopSort price-time-sort-form-inputs" type="radio" checked name="radio" value="price1" data-state="checked"><label for="priceTopSort"> – по возрастанию цены</label><Br>
								<input id="priceLowSort" class="priceLowSort price-time-sort-form-inputs" type="radio" name="radio" value="price2" data-state="unchecked"><label for="priceLowSort"> – по убыванию цены</label><Br>
								<input id="durationTopSort" class="durationTopSort price-time-sort-form-inputs" type="radio" name="radio" value="time1" data-state="unchecked"><label for="durationTopSort"> – по времени в пути</label>
							</form>
							<form class="content-container__left-part__sort-filters-container__form filters-form">
								<h2 class="content-container__left-part__sort-filters-container__form__h2">Фильтровать</h2>
								<input id="transfer1" class="transfer1" type="checkbox" name="checkbox" value="" checked><label for="transfer1"> – 1 пересадка</label><Br>
								<input id="without-transfer" class="without-transfer" type="checkbox" name="checkbox" value="" checked><label for="without-transfer"> – без пересадок</label><Br>
							</form>
							<form class="content-container__left-part__sort-filters-container__form price-form">
								<h2 class="content-container__left-part__sort-filters-container__form__h2">Цена</h2>
								<label for="price-low">От</label><input id="price-low" class="price-low" type="text" name="price-low" value=""><br>
								<label for="price-top">До</label><input id="price-top" class="price-top" type="text" name="price-top" value="">
							</form>
							<form class="content-container__left-part__sort-filters-container__form airlines-form">
							</form>
						</div>
					</div>
					<div class="content-container__right-part">
						<div class="content-container__right-part__orders__orders">
							${this.getInitialFlightsHTML(flightsList)}
						</div>
						<a class="content-container__right-part__load-more-button more-button">Показать ещё
						</a>
					</div>
		    `);
		});
  }

	afterRender(flightsData) {
		this.setActions(flightsData);
	}

	setActions(flightsData) {
		const moreButton = document.getElementsByClassName('content-container__right-part__load-more-button')[0],
					flightOrdersContainer = document.getElementsByClassName('content-container__right-part__orders__orders')[0],
					priceDurationSortRadioForm = document.getElementsByClassName('price-time-sort-form')[0],
					filtersForm = document.getElementsByClassName('filters-form')[0],
					airlinesForm = document.getElementsByClassName('airlines-form')[0],
					priceForm = document.getElementsByClassName('price-form')[0];
					airlinesForm.innerHTML = this.getAirlinesHTML(flightsData);

		moreButton.addEventListener('click', () => {
			const choosedFlightsData = this.sortFilterData(flightsData);

			flightOrdersContainer.insertAdjacentHTML('beforeend', this.drawFlightsHTML(choosedFlightsData));
		});

		priceDurationSortRadioForm.addEventListener('click', event => {
			const target = event.target,
						targetClassList = event.target.classList;
			let 	filteredData;

			switch(true) {
				case targetClassList.contains('priceTopSort'):
					this.stateDataset(priceDurationSortRadioForm, target);
					filteredData = this.sortFilterData(flightsData);
					localStorage.setItem('flightsCount', 0);
					flightOrdersContainer.innerHTML = this.drawFlightsHTML(filteredData);
					this.isAirlineChecked(flightsData)
					break;
				case targetClassList.contains('priceLowSort'):
					this.stateDataset(priceDurationSortRadioForm, target);
					filteredData = this.sortFilterData(flightsData);
					localStorage.setItem('flightsCount', 0);
					flightOrdersContainer.innerHTML = this.drawFlightsHTML(filteredData);
					this.isAirlineChecked(flightsData)
					break;
				case targetClassList.contains('durationTopSort'):
					this.stateDataset(priceDurationSortRadioForm, target);
					filteredData = this.sortFilterData(flightsData);
					localStorage.setItem('flightsCount', 0);
					flightOrdersContainer.innerHTML = this.drawFlightsHTML(filteredData);
					this.isAirlineChecked(flightsData)
					break;
			}
		})

		filtersForm.addEventListener('click', event => {
			const target = event.target;
			let 	filteredData;

			if (target.tagName === 'INPUT' || target.tagName === 'LABEL') {
				filteredData = this.sortFilterData(flightsData);
				localStorage.setItem('flightsCount', 0);

				flightOrdersContainer.innerHTML = this.drawFlightsHTML(filteredData);
				this.isAirlineChecked(flightsData)
			}
		});

		priceForm.addEventListener('keyup', event => {
			const target = event.target;
			let 	filteredData;

			if (target.tagName === 'INPUT' || target.tagName === 'LABEL') {
				filteredData = this.sortFilterData(flightsData);
				localStorage.setItem('flightsCount', 0);
				flightOrdersContainer.innerHTML = this.drawFlightsHTML(filteredData);
				this.isAirlineChecked(flightsData)
			}
		});

		airlinesForm.addEventListener('click', event => {
			const target = event.target;
			let	filteredData;

			if (target.tagName === 'INPUT') {
				target.toggleAttribute('checked');
				filteredData = this.sortFilterData(flightsData);
				localStorage.setItem('flightsCount', 0);
				flightOrdersContainer.innerHTML = this.drawFlightsHTML(this.filterByAirlines(filteredData));
			}
		})
}

	filterByAirlines(filteredData) {
		const airlinesForm = document.getElementsByClassName('airlines-form')[0],
					airlinesFormInputs = airlinesForm.getElementsByTagName('INPUT');
		let		filteredByAirlinesData,
					airlinesActiveInputs = [];

		for (let i=0; i<airlinesFormInputs.length; i++) {
			airlinesFormInputs[i].checked && airlinesActiveInputs.push(airlinesFormInputs[i].value);
		}

			filteredByAirlinesData = filteredData.filter(flightObj => {
					if (airlinesActiveInputs.indexOf(flightObj.flight.carrier.uid) != -1) {
						return true;
					} else return false;
			});

			return filteredByAirlinesData;
		}

	sortFilterData(flightsData){
		const priceDurationSortRadioForm = document.getElementById('price-time-sort-form'),
					sortInputs = priceDurationSortRadioForm.getElementsByClassName('price-time-sort-form-inputs'),
					transfer1Input = document.getElementsByClassName('transfer1')[0],
					withoutTransferInput = document.getElementsByClassName('without-transfer')[0];
		let 	filteredData;

		for (let i=0; i<sortInputs.length; i++) {
			switch(true) {
				case sortInputs[i].classList.contains('priceTopSort') && sortInputs[i].dataset.state === 'checked':

					if (transfer1Input.checked && !withoutTransferInput.checked) {
						filteredData = this.sortByPriceTopData(this.filterTransfer1Data(this.filterPriceData(flightsData)));
					} else if (!transfer1Input.checked && withoutTransferInput.checked) {
						filteredData = this.sortByPriceTopData(this.filterWithoutTransferData(this.filterPriceData(flightsData)));
					} else if (transfer1Input.checked && withoutTransferInput.checked){
						filteredData = this.sortByPriceTopData(this.filterPriceData(flightsData));
					}
					break;

				case sortInputs[i].classList.contains('priceLowSort') && sortInputs[i].dataset.state === 'checked':

					if (transfer1Input.checked && !withoutTransferInput.checked) {
						filteredData = this.sortByPriceLowData(this.filterTransfer1Data(this.filterPriceData(flightsData)));
					} else if (!transfer1Input.checked && withoutTransferInput.checked) {
						filteredData = this.sortByPriceLowData(this.filterWithoutTransferData(this.filterPriceData(flightsData)));
					} else if (transfer1Input.checked && withoutTransferInput.checked){
						filteredData = this.sortByPriceLowData(this.filterPriceData(flightsData));
					}
					break;

				case sortInputs[i].classList.contains('durationTopSort') && sortInputs[i].dataset.state === 'checked':

					if (transfer1Input.checked && !withoutTransferInput.checked) {
						filteredData = this.sortByDurationData(this.filterTransfer1Data(this.filterPriceData(flightsData)));
					} else if (!transfer1Input.checked && withoutTransferInput.checked) {
						filteredData = this.sortByDurationData(this.filterWithoutTransferData(this.filterPriceData(flightsData)));
					} else if (transfer1Input.checked && withoutTransferInput.checked){
						filteredData = this.sortByDurationData(this.filterPriceData(flightsData));
					}
					break;
			}
		}

		return filteredData;
	}

	filterTransfer1Data(flightsData) {
		const filteredData = flightsData.filter(flightObj => {
				if (flightObj.flight.legs[0].segments.length === 2 && flightObj.flight.legs[1].segments.length === 2) {
					return true;
				}
		});

		return filteredData;
	}

	filterWithoutTransferData(flightsData) {
		const filteredData = flightsData.filter(flightObj => {
				if (flightObj.flight.legs[0].segments.length === 1 && flightObj.flight.legs[1].segments.length === 1) {
					return true;
				}
		})

		return filteredData;
	}

	filterPriceData(flightsData) {
		const priceLowValue = document.getElementsByClassName('price-low')[0].value,
		priceTopValue = document.getElementsByClassName('price-top')[0].value;

		let filteredData;

		if (priceLowValue || priceTopValue) {
			filteredData = flightsData.filter(flightObj => {
				if (priceLowValue && !priceTopValue) {
					if (+flightObj.flight.price.total.amount > +priceLowValue) return true;
				} else if (!priceLowValue && priceTopValue) {
					if (+flightObj.flight.price.total.amount < +priceTopValue) return true;
				} else if (priceLowValue && priceTopValue) {
					if (+flightObj.flight.price.total.amount < +priceTopValue && +flightObj.flight.price.total.amount > priceLowValue) return true;
				} else return false
			});
		return filteredData;

		} else return flightsData;
	}

	stateDataset(radios, target) {
		const inputsArr = radios.getElementsByTagName('input');

		for (let i=0; i<inputsArr.length; i++) {
			if (inputsArr[i].classList === target.classList) {
				inputsArr[i].dataset.state='checked';
			} else {
				inputsArr[i].dataset.state='unchecked';
			}
		}
	}

	getInitialFlightsHTML(flightsData) {
		const priceTopSortedData = this.sortByPriceTopData(flightsData);

		return this.drawFlightsHTML(priceTopSortedData);
	}

	sortByPriceTopData(flightsData) {
		const mapped = flightsData.map((el, i) => {
			return {index: i, value: +el.flight.price.total.amount}
		});

		mapped.sort((a, b) => {
			if (a.value > b.value) {
				return 1;
			}
			if (a.value < b.value) {
				return -1;
			}
			return 0;
		});

		const result = mapped.map(el => {
			return flightsData[el.index];
		})

		return result;
	}

	sortByPriceLowData(flightsData) {
		const mapped = flightsData.map((el, i) => {
			return {index: i, value: +el.flight.price.total.amount}
		});

		mapped.sort((a, b) => {
			if (a.value > b.value) {
				return -1;
			}
			if (a.value < b.value) {
				return 1;
			}
			return 0;
		});

		const result = mapped.map(el => {
			return flightsData[el.index];
		})

		return result;
	}

	sortByDurationData(flightsData) {
		const mapped = flightsData.map((el, i) => {
			return {index: i, value: +el.flight.legs[0]. duration}
		});

		mapped.sort((a, b) => {
			if (a.value > b.value) {
				return 1;
			}
			if (a.value < b.value) {
				return -1;
			}
			return 0;
		});

		const result = mapped.map(el => {
			return flightsData[el.index];
		})

		return result;
	}

	getAirlinesInfo(flightsData) {
		const flightsActualData = this.sortFilterData(flightsData),
					airlinesTitle = {};

		if (Array.isArray(flightsActualData)) {
			if (flightsActualData.length != 0 || flightsActualData === undefined) {
				flightsActualData.forEach(obj => {
						if(!airlinesTitle[obj.flight.carrier.caption]) {
							const airlineObj = {
								'airLineCode': obj.flight.carrier.uid,
								'priceFrom': obj.flight.price.total.amount
							}
							airlinesTitle[obj.flight.carrier.caption] = airlineObj;
						} else {
							if (+obj.flight.price.total.amount < +airlinesTitle[obj.flight.carrier.caption].priceFrom) {
								airlinesTitle[obj.flight.carrier.caption].priceFrom = obj.flight.price.total.amount;
							}
						}
				})
			}
		}

		return airlinesTitle;
	}

	getAirlinesHTML(flightsData) {
		const airlinesData = this.getAirlinesInfo(flightsData),
					html = [`<h2 class="content-container__left-part__sort-filters-container__form__h2">Авиакомпании</h2>`];

		for (let key in airlinesData) {
			html.push(`
				<input value="${airlinesData[key].airLineCode}" id="${airlinesData[key].airLineCode}" type="checkbox" checked data-state="${airlinesData[key].airLineCode}"><label for="${airlinesData[key].airLineCode}" data-state="${airlinesData[key].airLineCode}"> – ${key} от ${airlinesData[key].priceFrom} р.</label>
				<br>
			`);
		}

		return html.join('\n ');
	}

	isAirlineChecked(flightsData) {
		const airlinesData = this.getAirlinesInfo(flightsData),
					airlinesForm = document.getElementsByClassName('airlines-form')[0],
					airlinesActualUid = [],
					airlinesInputs = airlinesForm.getElementsByTagName('INPUT');

		for (let key in airlinesData) {
			airlinesActualUid.push(airlinesData[key].airLineCode);
		}

		for (let i=0; i<airlinesInputs.length; i++) {
			airlinesInputs[i].setAttribute('checked', true);
			if (airlinesActualUid.indexOf(airlinesInputs[i].value) != -1) {
				airlinesInputs[i].setAttribute('checked', true);
				airlinesInputs[i].removeAttribute('disabled', true);
			} else {
				airlinesInputs[i].removeAttribute('checked');
				airlinesInputs[i].setAttribute('disabled', true);
			}
		}
	}

	drawFlightsHTML(sortedData) {
		let count = 0,
				step = 2;

			if (localStorage.getItem('flightsCount')) {
				count = +localStorage.getItem('flightsCount');
			}

		const html = [];
		step+=count;

		if (Array.isArray(sortedData)) {
			if (sortedData.length != 0 || sortedData === undefined) {
				for (let i=count; i < step; i++) {
					const flightSegmentsLeg0 = sortedData[i].flight.legs[0].segments,
					flightSegmentsLeg1 = sortedData[i].flight.legs[1].segments;

					let departureCityLeg0 = flightSegmentsLeg0[0].departureCity.caption,
							departureAirportLeg0 = flightSegmentsLeg0[0].departureAirport.caption,
							departureAirportUidLeg0 = flightSegmentsLeg0[0].departureAirport.uid,
							departureDateLeg0 = flightSegmentsLeg0[0].departureDate.substr(0,10),
							departureTimeLeg0 = flightSegmentsLeg0[0].departureDate.substr(11,15),
							arrivalCityLeg0 = flightSegmentsLeg0[flightSegmentsLeg0.length - 1].arrivalCity.caption,
							arrivalAirportLeg0 = flightSegmentsLeg0[flightSegmentsLeg0.length - 1].arrivalAirport.caption,
							arrivalAirportUidLeg0 = flightSegmentsLeg0[flightSegmentsLeg0.length - 1].arrivalAirport.uid,
							arrivalDateLeg0 = flightSegmentsLeg0[flightSegmentsLeg0.length - 1].arrivalDate.substr(0,10),
							arrivalTimeLeg0 = flightSegmentsLeg0[flightSegmentsLeg0.length - 1].arrivalDate.substr(11,15),
							travelDurationLeg0 = sortedData[i].flight.legs[0].duration,
							airlineLeg0 = flightSegmentsLeg0[0].airline.caption,
							price = sortedData[i].flight.price.total.amount,
							transfersLeg0 = flightSegmentsLeg0.length - 1,
							airlineUid = sortedData[i].flight.carrier.uid;

					let departureCityLeg1 = flightSegmentsLeg1[0].departureCity.caption,
							departureAirportLeg1 = flightSegmentsLeg1[0].departureAirport.caption,
							departureAirportUidLeg1 = flightSegmentsLeg1[0].departureAirport.uid,
							departureDateLeg1 = flightSegmentsLeg1[0].departureDate.substr(0,10),
							departureTimeLeg1 = flightSegmentsLeg1[0].departureDate.substr(11,15),
							arrivalCityLeg1 = flightSegmentsLeg1[flightSegmentsLeg1.length - 1].arrivalCity.caption,
							arrivalAirportLeg1 = flightSegmentsLeg1[flightSegmentsLeg1.length - 1].arrivalAirport.caption,
							arrivalAirportUidLeg1 = flightSegmentsLeg1[flightSegmentsLeg1.length - 1].arrivalAirport.uid,
							arrivalDateLeg1 = flightSegmentsLeg1[flightSegmentsLeg1.length - 1].arrivalDate.substr(0,10),
							arrivalTimeLeg1 = flightSegmentsLeg1[flightSegmentsLeg1.length - 1].arrivalDate.substr(11,15),
							travelDurationLeg1 = sortedData[i].flight.legs[1].duration,
							airlineLeg1 = flightSegmentsLeg1[0].airline.caption,
							transfersLeg1 = flightSegmentsLeg1.length - 1;

							count++;

							html[i] = `
											<div class="content-container__right-part__orders__order">
												<div class="content-container__right-part__orders__order__flight-box">
													<div class="content-container__right-part__orders__order__flight-box__flight-title">
														<img src="${this.getAirlineLogo(airlineUid)}" alt="lot">
														<p class="content-container__right-part__orders__order__flight-box__flight-title__price-box"><span class="content-container__right-part__orders__order__flight-box__flight-title__price-box__price-text">${price}</span><span> Р</span><br>Стоимость для одного взрослого пассажира</p>
													</div>
													<div class="content-container__right-part__orders__order__flight-box__flight-route">
														<p class="content-container__right-part__orders__order__flight-box__flight-route__p">
															<span class="content-container__right-part__orders__order__flight-box__flight-route__p__departure-city">${departureCityLeg0}</span>,
															<span class="content-container__right-part__orders__order__flight-box__flight-route__p__departure-airport">${departureAirportLeg0}</span>
															<span class="content-container__right-part__orders__order__flight-box__flight-route__p__departure-airport-code">(${departureAirportUidLeg0})</span>
															&#8594;
															<span class="content-container__right-part__orders__order__flight-box__flight-route__p__arrival-city">${arrivalCityLeg0}</span>,
															<span class="content-container__right-part__orders__order__flight-box__flight-route__p__arrival-airport">${arrivalAirportLeg0}</span>
															<span class="content-container__right-part__orders__order__flight-box__flight-route__p__arrival-airport-code">(${arrivalAirportUidLeg0})</span>
														</p>
													</div>
													<div class="content-container__right-part__orders__order__flight-box__flight-time">
														<p class="content-container__right-part__orders__order__flight-box__flight-time__p">
															<span class="content-container__right-part__orders__order__flight-box__flight-time__p__departure-time">${departureTimeLeg0}</span>
															<span class="content-container__right-part__orders__order__flight-box__flight-time__p__departure-date">${departureDateLeg0}</span>
															<span class="content-container__right-part__orders__order__flight-box__flight-time__p__route-overall-time">&#9716; ${Math.trunc(travelDurationLeg0/60)} ч ${travelDurationLeg0 % 60} мин</span>
															<span class="content-container__right-part__orders__order__flight-box__flight-time__p__arrival-date">${arrivalDateLeg0}</span>
															<span class="content-container__right-part__orders__order__flight-box__flight-time__p__arrival-time">${arrivalTimeLeg0}</span>
														</p>
													</div>
													<div class="content-container__right-part__orders__order__flight-box__grey-line">
														<span class="content-container__right-part__orders__order__flight-box__grey-line__transfer-text ${this.isTransferActive(transfersLeg0)}">${transfersLeg0} пересадка</span>
													</div>
													<div class="content-container__right-part__orders__order__flight-box__airline-info">
														Рейс выполняет: <span class="content-container__right-part__orders__order__flight-box__airline-info__company-title">${airlineLeg0}</span>
													</div>
												</div>
												<div class="content-container__right-part__orders__order__flight-box flight-box-without-logo">
													<div class="content-container__right-part__orders__order__flight-box__flight-route">
														<p class="content-container__right-part__orders__order__flight-box__flight-route__p">
															<span class="content-container__right-part__orders__order__flight-box__flight-route__p__departure-city">${departureCityLeg1}</span>,
															<span class="content-container__right-part__orders__order__flight-box__flight-route__p__departure-airport">${departureAirportLeg1}</span>
															<span class="content-container__right-part__orders__order__flight-box__flight-route__p__departure-airport-code">(${departureAirportUidLeg1})</span>
															&#8594;
															<span class="content-container__right-part__orders__order__flight-box__flight-route__p__arrival-city">${arrivalCityLeg1}</span>,
															<span class="content-container__right-part__orders__order__flight-box__flight-route__p__arrival-airport">${arrivalAirportLeg1}</span>
															<span class="content-container__right-part__orders__order__flight-box__flight-route__p__arrival-airport-code">(${arrivalAirportUidLeg1})</span>
														</p>
													</div>
													<div class="content-container__right-part__orders__order__flight-box__flight-time">
														<p class="content-container__right-part__orders__order__flight-box__flight-time__p">
															<span class="content-container__right-part__orders__order__flight-box__flight-time__p__departure-time">${departureTimeLeg1}</span>
															<span class="content-container__right-part__orders__order__flight-box__flight-time__p__departure-date">${departureDateLeg1}</span>
															<span class="content-container__right-part__orders__order__flight-box__flight-time__p__route-overall-time">&#9716; ${Math.trunc(travelDurationLeg1/60)} ч ${travelDurationLeg1 % 60} мин</span>
															<span class="content-container__right-part__orders__order__flight-box__flight-time__p__arrival-date">${arrivalDateLeg1}</span>
															<span class="content-container__right-part__orders__order__flight-box__flight-time__p__arrival-time">${arrivalTimeLeg1}</span>
														</p>
													</div>
													<div class="content-container__right-part__orders__order__flight-box__grey-line">
														<span class="content-container__right-part__orders__order__flight-box__grey-line__transfer-text ${this.isTransferActive(transfersLeg1)}">${transfersLeg1} пересадка</span>
													</div>
													<div class="content-container__right-part__orders__order__flight-box__airline-info">
														Рейс выполняет: <span class="content-container__right-part__orders__order__flight-box__airline-info__company-title">${airlineLeg1}</span>
													</div>
												</div>
												<a class="content-container__right-part__orders__order__choose-button">Выбрать</a>
											</div>
										`
				}
			}
		}

		localStorage.setItem('flightsCount', count);

		return html.join('\n ');
	}

	isTransferActive(transfers) {
		if (transfers == '0') return 'no-transfer'
		else return ''
	}

	getAirlineLogo(airlineUid) {
		let airlineImgLink;
		switch (true) {
			case airlineUid === 'LO':
				airlineImgLink = 'https://do4r85wsrjs5z.cloudfront.net/kpbeucoesiepoj/img/logo_en.svg';
				break;
			case airlineUid === 'BT':
				airlineImgLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/AirBaltic_logo.svg/1280px-AirBaltic_logo.svg.png';
				break;
			case airlineUid === 'AF':
				airlineImgLink = 'https://airhex.com/images/airline-logos/air-france.png';
				break;
			case airlineUid === 'KL':
				airlineImgLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/KLM_logo.svg/1280px-KLM_logo.svg.png';
				break;
			case airlineUid === 'SN':
				airlineImgLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Brussels_Airlines_logo.svg/2560px-Brussels_Airlines_logo.svg.png';
				break;
			case airlineUid === 'TK':
				airlineImgLink = 'https://www.freepnglogos.com/uploads/turkish-airlines-logos-png-1.png';
				break;
			case airlineUid === 'SU1':
				airlineImgLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Aeroflot_Russian_Airlines_logo_%28ru%29.svg/2560px-Aeroflot_Russian_Airlines_logo_%28ru%29.svg.png';
				break;
			case airlineUid === 'AZ':
				airlineImgLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Alitalia_logo_2017.png/1200px-Alitalia_logo_2017.png';
				break;
			case airlineUid === 'AY':
				airlineImgLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Finnair_Logo.svg/1280px-Finnair_Logo.svg.png';
				break;
			case airlineUid === 'PC':
				airlineImgLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Pegasus_Airlines_logo.svg/1280px-Pegasus_Airlines_logo.svg.png';
				break;
		}
		return airlineImgLink;
	}

}
export default SearchResult;
