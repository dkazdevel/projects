import {parseRequestURL} from '../../helpers/utils.js';
import Component from '../../views/component.js';

import Emails from '../../models/emails.js';


class Courses extends Component {
	constructor() {
		super();

		this.model = new Emails();
	}


  render() {
		return new Promise(resolve => {
			if (parseRequestURL().lang === 'pl') {
				resolve(`
					<div class="content-container__inside">
						<div class="content-container__aboutUs-container">
							<div class="content-container__aboutUs-container__aboutUs">
								<div class="content-container__aboutUs-container__aboutUs__img-container display-left img-mobile-for-remove">
									<img class="content-container__aboutUs-container__aboutUs__img-container__img" src="img/IMG_6751.png">
								</div>
								<div class="content-container__aboutUs-container__aboutUs__text-container display-right">
									<h2 class="content-container__aboutUs-container__aboutUs__text-container__h2">Teoria</h2>
									<p class="content-container__aboutUs-container__aboutUs__text-container__p">
									Teoria pozwoli Cię otrzymać strategię rozwoju krok po kroku. Nie będziemy rzucać w ciebie niepotrzebnej informacji i faktami z życia, ale nauczymy i opowiemy:
										<br><br>
										<span>Jak się zachowują włosy w kontacie z produktami</span>
										<span>Omówimy krok po kroku pracę z klientem w ramach zabiegu odnowy lub prostowania włosów</span>
										<span>Powiemy Cię, czego będziesz potrzebowała na początkowym etapie i w trakcie pracy</span>
										<span>Opowiemy, co przyciąga nowych klientów i zmusza do utrzymania stałych</span>
									</p>
								</div>
								<div class="content-container__aboutUs-container__aboutUs__img-container display-left img-mobile">
									<img class="content-container__aboutUs-container__aboutUs__img-container__img" src="img/IMG_6751.png">
								</div>
						</div>
						<div class="content-container__aboutUs-container white-background">
	            <div class="content-container__aboutUs-container__aboutUs">
								<div class="content-container__aboutUs-container__aboutUs__text-container pink-text-border">
	                <h2 class="content-container__aboutUs-container__aboutUs__text-container__h2 pink-h2-border">Praktyka</h2>
									<p class="content-container__aboutUs-container__aboutUs__text-container__p">
									Wszystkie materiały i modele są dostarczane przez nasz salon
										<br><br>
										<span>Praktyczne ćwiczenia prostowania na modelkach o różnym stopniu zniszczenia włosów</span>
										<span>Ilustrujące przykłady twoich błedów i poprawnych działań</span>
										<span>Analiza produktów. Porozmawiamy o tym, co i z czym można mieszać, gdzie stosować i pokażemy, jak to zrobić</span>
										<span>Egzamin</span>
										<span>Wydanie certyfikatu</span>
									</p>
	              </div>
								<div class="content-container__aboutUs-container__aboutUs__img-container">
	                <img class="content-container__aboutUs-container__aboutUs__img-container__img  pink-img-border" src="img/IMG_6739.png">
	              </div>
	            </div>
	          </div>
						<div class="content-container__price-container">
							<div class="content-container__price-container__inside">
								<h2 class="content-container__aboutUs-container__aboutUs__text-container__h2 h2-width">Cennik</h2>
								<div class="content-container__price-container__inside__price-text-container">
									<div class="content-container__price-container__inside__price-text-container__block">
										<h2 class="content-container__price-container__inside__price-text-container__block__h2 toEqualiseBlocks">Keratyna</h2>
										<p class="content-container__price-container__inside__price-text-container__block__p">85% kursantek po pierwszym miesiącu zwraca koszt kursu + wszystkie zakupione materiały</p>
										<h2 class="content-container__price-container__inside__price-text-container__block__h2 margin-bottom">1000 zł</h2>
										<p class="content-container__aboutUs-container__aboutUs__text-container__block__p">
										Pełny koszt kursu
											<br><br>
											<span>Szkolenia indywidualne</span>
											<span>1 dzień teorii i praktyki</span>
											<span>Praca na modelach</span>
											<span>Konsultacje w ciągu miesiąca po szkoleniu</span>
											<span>Stały rabat 10% na zakup preparatów</span>
										</p>
										<a id="keratynaButton" class="content-container__price-container__inside__price-text-container__block__button">Zapisać się</a>
									</div>
									<div class="content-container__price-container__inside__price-text-container__block">
										<h2 class="content-container__price-container__inside__price-text-container__block__h2 toEqualiseBlocks">Keratyna + Botox</h2>
										<p class="content-container__price-container__inside__price-text-container__block__p">85% kursantek po pierwszym miesiącu zwraca koszt kursu + wszystkie zakupione materiały</p>
										<h2 class="content-container__price-container__inside__price-text-container__block__h2 margin-bottom">1400 zł</h2>
										<p class="content-container__aboutUs-container__aboutUs__text-container__block__p">
										Pełny koszt kursu
											<br><br>
											<span>Szkolenia indywidualne</span>
											<span>1 dzień teorii i praktyki</span>
											<span>Praca na modelach</span>
											<span>Konsultacje w ciągu miesiąca po szkoleniu</span>
											<span>Stały rabat 10% na zakup preparatów</span>
										</p>
										<a id="KeratynaBotoxButton" class="content-container__price-container__inside__price-text-container__block__button">Zapisać się</a>
									</div>
									<div class="content-container__price-container__inside__price-text-container__block last-block">
										<h2 class="content-container__price-container__inside__price-text-container__block__h2">Keratyna + Botox + Nanoplastia</h2>
										<p class="content-container__price-container__inside__price-text-container__block__p">85% kursantek po pierwszym miesiącu zwraca koszt kursu + wszystkie zakupione materiały</p>
										<h2 class="content-container__price-container__inside__price-text-container__block__h2 margin-bottom">1700 zł</h2>
										<p class="content-container__aboutUs-container__aboutUs__text-container__block__p">
										Pełny koszt kursu
											<br><br>
											<span>Szkolenia indywidualne</span>
											<span>1 dzień teorii i praktyki</span>
											<span>Praca na modelach</span>
											<span>Konsultacje w ciągu miesiąca po szkoleniu</span>
											<span>Stały rabat 10% na zakup preparatów</span>
										</p>
										<a id="KeratynaBotoxNanoButton" class="content-container__price-container__inside__price-text-container__block__button">Zapisać się</a>
									</div>
								</div>
							</div>
						</div>
						<div class="content-container__form-container">
							<form class="content-container__form-container__form">
								<fieldset>
									<legend>Zapisz się</legend>
									<input class="form-title" type="text" placeholder="Szkolenie">
									<input class="form-name" type="text" placeholder="Imię">
									<input class="form-tel" type="text" placeholder="Telefon">
									<input class="form-email" type="text" placeholder="Email">
									<div class="errors"></div>
									<h3>Lub zadzwoń do nas<span class="number"><br><br>+48 884 960 413</span></h3>
								</fieldset>
								<button type="submit" class="content-container__form-container__form__button">Zapisać się</button>
								<div class="submit-message"></div>
							</form>
						</div>
					</div>
				`);
			} else if (parseRequestURL().lang === 'ru') {
				resolve(`
					<div class="content-container__inside">
						<div class="content-container__aboutUs-container">
							<div class="content-container__aboutUs-container__aboutUs">
								<div class="content-container__aboutUs-container__aboutUs__img-container display-left img-mobile-for-remove">
									<img class="content-container__aboutUs-container__aboutUs__img-container__img" src="img/IMG_6751.png">
								</div>
								<div class="content-container__aboutUs-container__aboutUs__text-container display-right">
									<h2 class="content-container__aboutUs-container__aboutUs__text-container__h2">Теория</h2>
									<p class="content-container__aboutUs-container__aboutUs__text-container__p">
									Теория позволит вам шаг за шагом получить стратегию развития. Мы не будем забрасывать вас ненужной информацией и фактами из жизни, а научим и расскажем:
										<br><br>
										<span>Как волосы ведут себя при контакте с соствами</span>
										<span>Обсудим с вами пошаговую работу в рамках процедуры восстановления или выпрямления волос</span>
										<span>Подскажем, что вам понадобится на начальном этапе и в процессе работы</span>
										<span>Мы расскажем, что привлекает новых клиентов и как удерживать уже существующих</span>
									</p>
								</div>
								<div class="content-container__aboutUs-container__aboutUs__img-container display-left img-mobile">
									<img class="content-container__aboutUs-container__aboutUs__img-container__img" src="img/IMG_6751.png">
								</div>
						</div>
						<div class="content-container__aboutUs-container white-background">
	            <div class="content-container__aboutUs-container__aboutUs">
								<div class="content-container__aboutUs-container__aboutUs__text-container pink-text-border">
	                <h2 class="content-container__aboutUs-container__aboutUs__text-container__h2 pink-h2-border">Практика</h2>
									<p class="content-container__aboutUs-container__aboutUs__text-container__p">
									Все материалы и модели поставляются нашим салоном
										<br><br>
										<span>Практика на моделях с разной степенью повреждения волос</span>
										<span>Наглядные примеры как ваших ошибок, так и правильных действий</span>
										<span>Строение волоса</span>
										<span>Виды диагностики волос</span>
										<span>Анализ составов. Мы поговорим о том, что и с чем можно смешивать, где использовать. Покажем вам, как это делать</span>
										<span>Экзамен</span>
										<span>Выдача сертификата</span>
									</p>
	              </div>
								<div class="content-container__aboutUs-container__aboutUs__img-container">
	                <img class="content-container__aboutUs-container__aboutUs__img-container__img  pink-img-border" src="img/IMG_6739.png">
	              </div>
	            </div>
	          </div>
						<div class="content-container__price-container">
							<div class="content-container__price-container__inside">
								<h2 class="content-container__aboutUs-container__aboutUs__text-container__h2 h2-width">Цены</h2>
								<div class="content-container__price-container__inside__price-text-container">
									<div class="content-container__price-container__inside__price-text-container__block">
										<h2 class="content-container__price-container__inside__price-text-container__block__h2 toEqualiseBlocks">Кератин</h2>
										<p class="content-container__price-container__inside__price-text-container__block__p">85% девушек за первый месяц окупают стоимость курса + все купленные материалы для работы</p>
										<h2 class="content-container__price-container__inside__price-text-container__block__h2 margin-bottom">1000 zł</h2>
										<p class="content-container__aboutUs-container__aboutUs__text-container__block__p">
										Стоимость полного курса
											<br><br>
											<span>Индивидуальное обучение</span>
											<span>1 день теории и практики</span>
											<span>Отработка на моделях</span>
											<span>Консультация в течение месяца после курса</span>
											<span>Постоянная скидка 10% на покупку составов</span>
										</p>
										<a id="keratynaButton" class="content-container__price-container__inside__price-text-container__block__button">Записаться</a>
									</div>
									<div class="content-container__price-container__inside__price-text-container__block">
										<h2 class="content-container__price-container__inside__price-text-container__block__h2 toEqualiseBlocks">Кератин + Ботокс</h2>
										<p class="content-container__price-container__inside__price-text-container__block__p">85% девушек за первый месяц окупают стоимость курса + все купленные материалы для работы</p>
										<h2 class="content-container__price-container__inside__price-text-container__block__h2 margin-bottom">1400 zł</h2>
										<p class="content-container__aboutUs-container__aboutUs__text-container__block__p">
										Стоимость полного курса
											<br><br>
											<span>Индивидуальное обучение</span>
											<span>1 день теории и практики</span>
											<span>Отработка на моделях</span>
											<span>Консультация в течение месяца после курса</span>
											<span>Постоянная скидка 10% на покупку составов</span>
										</p>
										<a id="KeratynaBotoxButton" class="content-container__price-container__inside__price-text-container__block__button">Записаться</a>
									</div>
									<div class="content-container__price-container__inside__price-text-container__block last-block">
										<h2 class="content-container__price-container__inside__price-text-container__block__h2">Кератин + Ботокс + Нанопластия</h2>
										<p class="content-container__price-container__inside__price-text-container__block__p">85% девушек за первый месяц окупают стоимость курса + все купленные материалы для работы</p>
										<h2 class="content-container__price-container__inside__price-text-container__block__h2 margin-bottom">1700 zł</h2>
										<p class="content-container__aboutUs-container__aboutUs__text-container__block__p">
										Стоимость полного курса
											<br><br>
											<span>Индивидуальное обучение</span>
											<span>1 день теории и практики</span>
											<span>Отработка на моделях</span>
											<span>Консультация в течение месяца после курса</span>
											<span>Постоянная скидка 10% на покупку составов.</span>
										</p>
										<a id="KeratynaBotoxNanoButton" class="content-container__price-container__inside__price-text-container__block__button">Записаться</a>
									</div>
								</div>
							</div>
						</div>
						<div class="content-container__form-container">
							<form class="content-container__form-container__form">
								<fieldset>
									<legend>Запишитесь на курс</legend>
									<input class="form-title" type="text" placeholder="Курс">
									<input class="form-name" type="text" placeholder="Имя">
									<input class="form-tel" type="text" placeholder="Телефон">
									<input class="form-email" type="text" placeholder="Email">
									<div class="errors"></div>
									<h3>Или позвоните нам<span class="number"><br><br>+48 884 960 413</span></h3>
								</fieldset>
								<button type="submit" class="content-container__form-container__form__button">Записаться</button>
								<div class="submit-message"></div>
							</form>
						</div>
					</div>
				`);
			}

		});
  }

	afterRender(){
		this.setActions();
	}

	setActions() {
		const buttonsToForm = document.getElementsByClassName('content-container__price-container__inside__price-text-container__block__button'),
		submitForm = document.getElementsByClassName('content-container__form-container__form')[0],
		userNameInput = document.getElementsByClassName('form-name')[0],
		courseTitleInput = document.getElementsByClassName('form-title')[0],
		userEmailInput = document.getElementsByClassName('form-email')[0],
		userTelInput = document.getElementsByClassName('form-tel')[0],
		errorsContainer = document.getElementsByClassName('errors')[0],
		messageContainer = document.getElementsByClassName('submit-message')[0];

		for (let i=0; i< buttonsToForm.length; i++) {
			buttonsToForm[i].addEventListener('click', event => this.redirectToForm(event));
		}

		userNameInput.addEventListener('change', () => {
			messageContainer.innerHTML = '';
		});

		courseTitleInput.addEventListener('change', () => {
			messageContainer.innerHTML = '';
		});

    userEmailInput.addEventListener('change', () => {
      if (!(/^([a-z]|\d|\_|\-|\.){3,20}@[a-z\d]{1,10}\.[a-z]{2,4}$/i.test(userEmailInput.value)) && userEmailInput.value.length > 0) {
        userEmailInput.value ='';

				if (parseRequestURL().lang === 'pl') {
					errorsContainer.innerHTML = 'Proszę sprawdzić wpisany email';
				} else if (parseRequestURL().lang === 'ru') {
					errorsContainer.innerHTML = 'Проверьте, пожалуйста, введённый email';
				}
      } else {
				errorsContainer.innerHTML = '';
			}

			messageContainer.innerHTML = '';
    });

    userTelInput.addEventListener('change', () => {
      if (!(/^\+?([\d]\s?){5,12}$/i.test(userTelInput.value)) && userTelInput.value.length > 0) {
        userTelInput.value ='';

				if (parseRequestURL().lang === 'pl') {
					errorsContainer.innerHTML = 'Proszę sprawdić wpisany numer telefonu';
				} else if (parseRequestURL().lang === 'ru') {
					errorsContainer.innerHTML = 'Проверьте, пожалуйста, введённый номер телефона';
				}
      } else {
				errorsContainer.innerHTML = '';
			}

			messageContainer.innerHTML = '';
    });

		submitForm.addEventListener('submit', event => {
      event.preventDefault();

      if (userNameInput.value != '' && userTelInput.value != '' && userEmailInput.value != '') {
        this.submitFormActions(courseTitleInput, userNameInput, userTelInput, userEmailInput);
      } else {
				if (parseRequestURL().lang === 'pl') {
					errorsContainer.innerHTML = 'Proszę uzupełnić Imię, numer telefonu oraz email';
				} else if (parseRequestURL().lang === 'ru') {
					errorsContainer.innerHTML = 'Заполните пожалуйста поля: Имя, Телефон, Email';
				}
      }
    });
	}

	redirectToForm(event) {
		const formTitleInput = document.getElementsByClassName('form-title')[0],
		target = event.target,
		titleToCopy = target.parentElement.getElementsByClassName('content-container__price-container__inside__price-text-container__block__h2')[0];

		formTitleInput.value = titleToCopy.innerHTML;
		document.getElementsByClassName("content-container__form-container")[0].scrollIntoView({block: 'end'});
	}

	submitFormActions(courseTitleInput, userNameInput, userTelInput, userEmailInput){
		const infoToSend = {
			'lang': parseRequestURL().lang,
			'title': `${courseTitleInput.value ? courseTitleInput.value : 'Не предоставлено'}`,
			'userName': userNameInput.value,
			'userTel': userTelInput.value,
			'userEmail': userEmailInput.value
		}
		this.model.sendEmailToOffice(infoToSend).then(() => this.showMessage(courseTitleInput, userNameInput, userTelInput, userEmailInput));
	}

	showMessage(courseTitleInput, userNameInput, userTelInput, userEmailInput) {
		const messageContainer = document.getElementsByClassName('submit-message')[0];

		if (parseRequestURL().lang === 'pl') {
			messageContainer.innerHTML = 'Dziękujemy, wiadomość została wysłana';
		} else if (parseRequestURL().lang === 'ru') {
			messageContainer.innerHTML = 'Спасибо, сообщение успешно отправлено';
		}

		courseTitleInput.value = '';
		userNameInput.value = '';
		userTelInput.value = '';
		userEmailInput.value = '';
	}

}

export default Courses;
