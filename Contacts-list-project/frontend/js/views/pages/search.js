import Component from '../../views/component';

import Contacts from '../../models/contacts';



class Search extends Component {
  constructor() {
    super();

    this.model = new Contacts();
  }

  render() {
      return new Promise(resolve => {
        resolve(`
                <div class="content-container__inside-container">
                  <div class="content-container__inside-container__toListLink">К списку</div>
                  <h1>Форма поиска</h1>
                  <form class="content-container__inside-container__addEditContactInfoForm">
                    <label for="firstName">Имя</label>
                    <input type="text" id="firstName"></input>
                    <h2 class="firstNameH2 formInfoH2"></h2>
                    <br>
                    <label for="secondName">Фамилия</label>
                    <input type="text" id="secondName"></input>
                    <h2 class="secondNameH2 formInfoH2"></h2>
                    <br>
                    <label for="lastName">Отчество</label>
                    <input type="text" id="lastName"></input>
                    <h2 class="lastNameH2 formInfoH2"></h2>
                    <br>
                    <h3 class="birthDateLowTopH3">Дата рождения</h3>
                    <label class="birthDateLowTopLabel" for="birthDateLow">От</label>
                    <input type="date" id="birthDateLow"></input>
                    <label class="birthDateLowTopLabel" for="birthDateTop">До</label>
                    <input type="date" id="birthDateTop"></input>
                    <h2 class="birthDateLowH2  birthDateTopH2 formInfoH2"></h2>
                    <br>
                    <h3>Пол</h2>
                    <input type="radio" id="male" value="male" name="sex"></input>
                    <label class="labelInitialWidth firstLabel" for="male">Мужской</label>
                    <input type="radio" id="female" value="female" name="sex"></input>
                    <label class="labelInitialWidth" for="female">Женский</label>
                    <h2 class="sexH2 formInfoH2"></h2>
                    <br>
                    <label for="citizenship">Гражданство</label>
                    <input type="text" id="citizenship"></input>
                    <h2 class="citizenshipH2 formInfoH2"></h2>
                    <br>
                    <label for="maritalStatus">Семейное положение</label>
                    <input type="text" id="maritalStatus"></input>
                    <h2 class="maritalStatusH2 formInfoH2"></h2>
                    <br>
                    <h2>Адрес:</h2>
                    <br>
                    <label for="country">Страна</label>
                    <input type="text" id="country"></input>
                    <h2 class="countryH2 formInfoH2"></h2>
                    <br>
                    <label for="city">Город</label>
                    <input type="text" id="city"></input>
                    <h2 class="cityH2 formInfoH2"></h2>
                    <br>
                    <label for="streetHouseFlatNumber">Улица/Дом/Квартира</label>
                    <input type="text" id="streetHouseFlatNumber"></input>
                    <h2 class="streetHouseFlatNumberH2 formInfoH2"></h2>
                    <br>
                    <label for="postCode">Индекс</label>
                    <input type="text" id="postCode"></input>
                    <h2 class="postCodeH2 formInfoH2"></h2>
                    <button disabled class="content-container__inside-container__addEditContactInfoForm__submitButton" type="submit">Поиск</button>
                    <h2 class="actionSearchErrorInfo"></h2>
                  </form>
                </div>
                      `);
      });

  }

  afterRender(){
    this.setActions();
  }

  setActions() {
    const searchContactForm = document.getElementsByClassName('content-container__inside-container__addEditContactInfoForm')[0],
          linkToList = document.getElementsByClassName('content-container__inside-container__toListLink')[0];

    searchContactForm.addEventListener('change', event => {
      const target = event.target,
            messageH2 = document.getElementsByClassName(`${target.id}H2`)[0];

      this.validateFormData(target, messageH2);
      this.isSubmitButtonActive(searchContactForm)
    })

    linkToList.addEventListener('click', () => {
      event.preventDefault();

      history.back()})

    searchContactForm.addEventListener('submit', event => {
      event.preventDefault();

      this.setNewSearchData(searchContactForm);
    })
  }

  isSubmitButtonActive(searchContactForm) {
    const inputsArr = searchContactForm.getElementsByTagName('INPUT'),
          submitButton = document.getElementsByClassName('content-container__inside-container__addEditContactInfoForm__submitButton')[0];

    let counter = 0;

    for (let input of inputsArr) {
      if (input.type === 'text' && input.value || input.type === 'radio' && input.checked || input.type === 'date' && input.value) {
        counter++;
      }
    }

    counter > 0 ? submitButton.disabled = false : submitButton.disabled = true;
  }

  validateFormData(target, messageH2) {
    switch(true) {
      case target.id === 'firstName' || target.id === 'secondName' || target.id === 'lastName' || target.id === 'citizenship' || target.id === 'maritalStatus' || target.id === 'country' || target.id === 'city' :

        if (!(/^([а-яё]|[a-z]){2,20}$/i.test(target.value)) && target.value.length > 0) {
          let label = document.querySelector(`[for="${target.id}"]`);

          target.value = '';
          messageH2.innerHTML = (`Пожалуйста, введите корректно: ${label.innerHTML}`)

        } else {
            messageH2.innerHTML = ('');
        }

        break;

        case target.id === 'postCode':
          if (!(/^\d{5,7}$/.test(target.value)) && target.value.length > 0) {
            target.value = '';
            messageH2.innerHTML = (`Пожалуйста, введите корректный индекс`)
          } else {
              messageH2.innerHTML = ('');
          }

          break;

      }
    }

    setNewSearchData(searchContactForm) {
      const inputsArr = searchContactForm.getElementsByTagName('INPUT'),
            searchContactDataObj = {},
            addressId = ['country', 'city', 'streetHouseFlatNumber', 'postCode'],
            addressObj = {},
            actionSearchErrorInfo = document.getElementsByClassName('actionSearchErrorInfo')[0];

      for (let input of inputsArr) {
        if (input.type === 'text' && input.value || input.type === 'date' && input.value) {
          if (!addressId.includes(input.id)) {
            searchContactDataObj[input.id] = input.value.toLowerCase();
          } else  {
              addressObj[input.id] = input.value.toLowerCase()
          }
        } else if (input.type === 'radio' && input.checked) {
          searchContactDataObj.sex = input.value === 'male' ? 'мужской' : 'женский';
        }
      }

      if (!this.isObjEmpty(addressObj)) {
        searchContactDataObj['address'] = addressObj;
      }

      this.model.setSearchResult(searchContactDataObj).then((response) => response.searchId !== 'NoData' ? location.hash = `/contacts/searchList/${response.searchId}` : actionSearchErrorInfo.innerHTML = 'Запрашиваемые контакты не найдены');
    }

    isObjEmpty(obj) {
        for (var i in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, i)) {
            return false;
          }
        }
        return true;
    }

}

export default Search;
