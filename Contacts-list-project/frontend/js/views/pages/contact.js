import {parseRequestURL} from '../../helpers/utils';

import Component from '../../views/component';

import Contacts from '../../models/contacts';



class Contact extends Component {
  constructor() {
    super();

    this.model = new Contacts();
  }

  getData() {
    return new Promise(resolve => this.model.getContactData(parseRequestURL().id).then(data => resolve(data)));
  }

  render(data) {
    const contactData = data[0];

      return new Promise(resolve => {
        resolve(`
                <div class="content-container__inside-container">
                  <div class="content-container__inside-container__toListLink">К списку</div>
                  <h1>${parseRequestURL().action === 'edit' ? 'Форма редактирования контакта' : 'Форма добавления нового контакта'}</h1>
                  <form class="content-container__inside-container__addEditContactInfoForm">
                    <label for="firstName">Имя *</label>
                    <input type="text" id="firstName" ${parseRequestURL().action === 'edit' && `value="${contactData.firstName}"`}></input>
                    <h2 class="firstNameH2 formInfoH2"></h2>
                    <br>
                    <label for="secondName">Фамилия *</label>
                    <input type="text" id="secondName" ${parseRequestURL().action === 'edit' && `value="${contactData.secondName}"`}></input>
                    <h2 class="secondNameH2 formInfoH2"></h2>
                    <br>
                    <label for="lastName">Отчество</label>
                    <input type="text" id="lastName" ${parseRequestURL().action === 'edit' && this.getAttributeToInput(contactData.lastName)}></input>
                    <h2 class="lastNameH2 formInfoH2"></h2>
                    <br>
                    <label for="birthDate">Дата рождения</label>
                    <input type="date" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" id="birthDate" ${parseRequestURL().action === 'edit' && `value="${contactData.birthDate}"`}></input>
                    <h2 class="birthDateH2 formInfoH2"></h2>
                    <br>
                    <h3>Пол</h2>
                    <input type="radio" id="male" value="male" name="sex" ${parseRequestURL().action === 'edit' && contactData.sex === 'мужской' ? 'checked' : ''}></input>
                    <label class="labelInitialWidth firstLabel" for="male">Мужской</label>
                    <input type="radio" id="female" value="female" name="sex" ${parseRequestURL().action === 'edit' && contactData.sex === 'женский' ? 'checked' : ''}></input>
                    <label class="labelInitialWidth" for="female">Женский</label>
                    <h2 class="sexH2 formInfoH2"></h2>
                    <br>
                    <label for="citizenship">Гражданство</label>
                    <input type="text" id="citizenship" ${parseRequestURL().action === 'edit' && this.getAttributeToInput(contactData.citizenship)}></input>
                    <h2 class="citizenshipH2 formInfoH2"></h2>
                    <br>
                    <label for="maritalStatus">Семейное положение</label>
                    <input type="text" id="maritalStatus" ${parseRequestURL().action === 'edit' && this.getAttributeToInput(contactData.maritalStatus)}></input>
                    <h2 class="maritalStatusH2 formInfoH2"></h2>
                    <br>
                    <label for="website">Web Site</label>
                    <input type="text" id="website" ${parseRequestURL().action === 'edit' && this.getAttributeToInput(contactData.website)}></input>
                    <h2 class="websiteH2 formInfoH2"></h2>
                    <br>
                    <label for="email">Email</label>
                    <input type="text" id="email" ${parseRequestURL().action === 'edit' && this.getAttributeToInput(contactData.email)}></input>
                    <h2 class="emailH2 formInfoH2"></h2>
                    <br>
                    <label for="company">Текущее место работы</label>
                    <input type="text" id="company" ${parseRequestURL().action === 'edit' && this.getAttributeToInput(contactData.company)}></input>
                    <h2 class="companyH2 formInfoH2"></h2>
                    <br>
                    <h2>Адрес:</h2>
                    <br>
                    <label for="country">Страна</label>
                    <input type="text" id="country" ${parseRequestURL().action === 'edit' && this.getAttributeToInput(contactData.address.country)}></input>
                    <h2 class="countryH2 formInfoH2"></h2>
                    <br>
                    <label for="city">Город</label>
                    <input type="text" id="city" ${parseRequestURL().action === 'edit' && this.getAttributeToInput(contactData.address.city)}></input>
                    <h2 class="cityH2 formInfoH2"></h2>
                    <br>
                    <label for="streetHouseFlatNumber">Улица/Дом/Квартира</label>
                    <input type="text" id="streetHouseFlatNumber" ${parseRequestURL().action === 'edit' && this.getAttributeToInput(contactData.address.streetHouseFlatNumber)}></input>
                    <h2 class="streetHouseFlatNumberH2 formInfoH2"></h2>
                    <br>
                    <label for="postCode">Индекс</label>
                    <input type="text" id="postCode" ${parseRequestURL().action === 'edit' && this.getAttributeToInput(contactData.address.postCode)}></input>
                    <h2 class="postCodeH2 formInfoH2"></h2>
                    <h2 class="contactsTelDataH2">Список контактных телефонов</h2>
                    <h3 class="telDataActionInfo"></h3>
                    <table class="content-container__inside-container__table-container telDataTable">
                      <tr class="content-container__inside-container__table-container__telefonActionsButtons">
                        <td colspan="4">
                          <input class="deleteTelButton" type="button" value="Удалить"></input>
                          <input class="editTelButton" type="button" value="Редактировать">
                          <input type="button" class="createNewTelButton" value="Создать новый телефон">
                        </td>
                      </tr>
                      <tr class="first-line">
                        <td>Выбрать</td>
                        <td>Номер</td>
                        <td>Описание</td>
                        <td>Комментарий</td>
                      </tr>
                      ${this.getContactsTelHTML(contactData)}
                    </table>
                    <button disabled class="content-container__inside-container__addEditContactInfoForm__submitButton" type="submit">${parseRequestURL().action === 'add' ? 'Создать контакт' : 'Сохранить изменения'}</button>
                    <div class="actionInfoContainer"></div>
                  </form>
                </div>
                <div class="popup-bg">
                  <form class="popup">
                    <div class="close-popup">&#10006</div>
                    <label for="countryCode">Код страны</label>
                    <input type="text" id="countryCode" class="required-value"></input>
                    <h2 class="countryCodeActionInfo"></h2>
                    <label for="operatorCode">Код оператора</label>
                    <input type="text" id="operatorCode" class="required-value"></input>
                    <h2 class="operatorCodeActionInfo"></h2>
                    <label for="telephoneNumber">Телефонный номер</label>
                    <input type="text" id="telephoneNumber" class="required-value"></input>
                    <h2 class="telephoneNumberActionInfo"></h2>
                    <label for="telephoneType">Тип телефона</label>
                    <input type="text" list="telephone-types" id="telephoneType" class="required-value"></input>
                    <h2 class="telephoneTypeActionInfo"></h2>
                    <label for="comment">Комментарий</label>
                    <input type="text" id="comment"></input>
                    <h2 class="commentActionInfo"></h2>
                    <button disabled class="submitTelDataButton" type="submit">Сохранить</button>
                    <div class="submitActionInfo"></div>
                    <datalist id="telephone-types">
                      <option value="Домашний">
                      <option value="Мобильный">
                    </datalist>
                  </form>
                </div>
              </div>
                    `);
      });
  }

  afterRender(){
    this.setActions();
  }

  setActions() {
    const createEditContactForm = document.getElementsByClassName('content-container__inside-container__addEditContactInfoForm')[0],
          popupBg = document.getElementsByClassName('popup-bg')[0],
          popup = document.getElementsByClassName('popup')[0],
          createNewTelButton = document.getElementsByClassName('createNewTelButton')[0],
          editTelButton = document.getElementsByClassName('editTelButton')[0],
          closePopupButton = document.getElementsByClassName('close-popup')[0],
          deleteTelButton = document.getElementsByClassName('deleteTelButton')[0],
          linkToList = document.getElementsByClassName('content-container__inside-container__toListLink')[0];

    window.onload = this.onloadActions(createEditContactForm, editTelButton, deleteTelButton);

    linkToList.addEventListener('click', () => {
      event.preventDefault()

      history.back()
    });

    createEditContactForm.addEventListener('change', event => {
      const target = event.target,
            messageH2 = document.getElementsByClassName(`${target.id}H2`)[0];

      this.validateFormData(target, messageH2);
      this.isSubmitButtonActive();
    });

    popup.addEventListener('change', event => {
      const target = event.target;

      this.validateTelData(target);
      this.isSubmitTelDataButtonActive(popup);
      this.hideMessage();
    });

    createEditContactForm.addEventListener('submit', event => {
      event.preventDefault();

      this.setNewContactData();
    });

    popup.addEventListener('submit', event => {
      event.preventDefault();

      this.setNewTelData(popup);
      this.showTelActionMessage();
      this.isSubmitTelDataButtonActive(popup);
      this.isDeleteEditTelButtonActive(createEditContactForm, editTelButton, deleteTelButton)
    });

    createNewTelButton.addEventListener('click', event => {
        event.preventDefault();

        this.clearPopupFields(popup);
        this.addDataset(event.target)
        this.openPopup(popupBg, popup);
    });

    editTelButton.addEventListener('click', event => {
        event.preventDefault();

        this.popupEditActions(popup, popupBg, event.target);
        this.isSubmitTelDataButtonActive(popup);
    });

    closePopupButton.addEventListener('click',() => {
        popupBg.classList.remove('active');
        popup.classList.remove('active');

        popup.dataset.status === 'updated' && location.reload();
    });

    document.addEventListener('click', event => {

        if(event.target === popupBg) {
            popupBg.classList.remove('active');
            popup.classList.remove('active');

            popup.dataset.status === 'updated' && location.reload();
        }
    });

    deleteTelButton.addEventListener('click', () => {
      this.deleteActions();
      this.isDeleteEditTelButtonActive(createEditContactForm, editTelButton, deleteTelButton);
    });
  }

  getAttributeToInput(inputData) {

    if (inputData === 'Не указано') {
      return `placeholder="${inputData}"`;
    } else {
      return `value="${inputData}"`;
    }
  }

  openPopup(popupBg, popup) {
    popupBg.classList.add('active');
    popup.classList.add('active');

    this.hideMessage()
  }

  popupEditActions(popupForm, popupBg, target) {
    const telDataTable = document.getElementsByClassName('telDataTable')[0],
          telDataTableCheckboxes = telDataTable.querySelectorAll('input[type="checkbox"]'),
          telDataActionInfo = document.getElementsByClassName('telDataActionInfo')[0],
          submitButton = document.getElementsByClassName('submitTelDataButton')[0],
          telIdChecked = [];

    for (let input of telDataTableCheckboxes) {
      if (input.checked === true) {
        telIdChecked.push(input);
      }
    }

    if (telIdChecked.length === 1) {
      const checkedTelData = this.getCheckedTelData(telIdChecked[0].dataset.id);

      this.fillTelData(checkedTelData, popupForm);
      submitButton.dataset.id = telIdChecked[0].dataset.id;

      this.openPopup(popupForm, popupBg);
      this.addDataset(target);

      telDataActionInfo.innerHTML = ('');
    } else {
      telDataActionInfo.innerHTML = ('Пожалуйста, выберите один контакт для редактирования');
    }
  }

  deleteActions() {
    const deleteCheckboxes = document.getElementsByClassName('chooseCheckbox'),
          idForDelete = [];

    for (let i=0; i<deleteCheckboxes.length;i++) {
        if (deleteCheckboxes[i].checked) {
          idForDelete.push(deleteCheckboxes[i].dataset.id);
        }
    }

    for (let i=0; i<idForDelete.length; i++) {
      document.querySelector(`tr[id='${idForDelete[i]}']`).remove();
    }

    if (!document.getElementsByClassName('contactTelLine')[0]) {
      const telDataTable = document.getElementsByClassName('telDataTable')[0],
            telDataTbody = telDataTable.getElementsByTagName('TBODY')[0];

      telDataTbody.insertAdjacentHTML('beforeend', `
        <tr>
          <td>–</td>
          <td>–</td>
          <td>–</td>
          <td>–</td>
        </tr>
      `);
    }
  }

  clearPopupFields(popupForm) {
    const popupFormInputs = popupForm.getElementsByTagName('INPUT');

    for (let input of popupFormInputs) {
      input.value = '';
    }
  }

  addDataset(target) {
    const submitButton = document.getElementsByClassName('submitTelDataButton')[0];

    if (target.classList.contains('createNewTelButton')) {
      submitButton.dataset.action = 'add';
      submitButton.removeAttribute('data-id');
    } else submitButton.dataset.action = 'edit';
  }

  getCheckedTelData(inputCheckedId) {
    const checkedTR = document.getElementById(`${inputCheckedId}`),
          countryCode =  checkedTR.getElementsByClassName('countryCode')[0],
          operatorCode = checkedTR.getElementsByClassName('operatorCode')[0],
          telephoneNumber = checkedTR.getElementsByClassName('telephoneNumber')[0],
          telephoneType = checkedTR.getElementsByClassName('telephoneType')[0],
          comment = checkedTR.getElementsByClassName('comment')[0];

    const filteredData = {
      telId: inputCheckedId,
      countryCode: countryCode.innerHTML,
      operatorCode: operatorCode.innerHTML,
      telephoneNumber: telephoneNumber.innerHTML,
      telephoneType: telephoneType.innerHTML,
      comment: comment.innerHTML
    }

    return filteredData;
  }

  fillTelData(data, popupForm) {
    const popupFormInputs = popupForm.getElementsByTagName('INPUT');

    for (let input of popupFormInputs) {
      let inputId = input.id;

      input.value = data[inputId];
    }
  }

  validateTelData(target) {
    const actionInfoField = document.getElementsByClassName(`${target.id}ActionInfo`)[0];

    switch(true) {
      case target.id === 'countryCode':

        if (!(/^(\+?[0-9]){1,4}$/i.test(target.value)) && target.value.length > 0) {
          let label = document.querySelector(`[for="${target.id}"]`);

          target.value = '';
          actionInfoField.innerHTML = (`Пожалуйста, введите корректно: ${label.innerHTML}`);
        } else {
          actionInfoField.innerHTML = ('');
        }

        break;

      case target.id === 'operatorCode':

        if (!(/^([0-9]){2,4}$/i.test(target.value)) && target.value.length > 0) {
          let label = document.querySelector(`[for="${target.id}"]`);

          target.value = '';
          actionInfoField.innerHTML = (`Пожалуйста, введите корректно: ${label.innerHTML}`);
        } else {
          actionInfoField.innerHTML = ('');
        }

        break;

      case target.id === 'telephoneNumber':

        if (!(/^([0-9]){6,9}$/i.test(target.value)) && target.value.length > 0) {
          let label = document.querySelector(`[for="${target.id}"]`);

          target.value = '';
          actionInfoField.innerHTML = (`Пожалуйста, введите корректно: ${label.innerHTML}`);
        } else {
          actionInfoField.innerHTML = ('');
        }

        break;

      case target.id === 'telephoneType':

        if (!['мобильный', 'домашний'].includes(target.value.toLowerCase())) {
          let label = document.querySelector(`[for="${target.id}"]`);

          actionInfoField.innerHTML = (`Пожалуйста, выберите ${label.innerHTML} из двух предложенных вариантов`);
        } else {
          actionInfoField.innerHTML = ('');
        }

        break;
      }
  }

  onloadActions(data, editTelButton, deleteTelButton) {
    this.isSubmitButtonActive();
    this.isDeleteEditTelButtonActive(data, editTelButton, deleteTelButton);
  }

  isSubmitButtonActive() {
    const firstNameInput = document.getElementById('firstName'),
          secondNameInput = document.getElementById('secondName'),
          submitButton = document.getElementsByClassName('content-container__inside-container__addEditContactInfoForm__submitButton')[0];

    firstNameInput.value && secondNameInput.value ? submitButton.disabled = false : submitButton.disabled = true;
  }

  isDeleteEditTelButtonActive(createEditContactForm, editTelButton, deleteTelButton) {

    if (!createEditContactForm.getElementsByClassName('contactTelLine')[0]) {
       editTelButton.disabled = true;
       deleteTelButton.disabled = true;
    } else {
        editTelButton.disabled = false;
        deleteTelButton.disabled = false;
      }
  }

  isSubmitTelDataButtonActive(form) {
    const contactTelInputs = form.getElementsByClassName('required-value'),
          submitTelData = document.getElementsByClassName('submitTelDataButton')[0];

    let counter=0;

    for (let input of contactTelInputs) {
      input.value && counter++;
    }

    counter === contactTelInputs.length ? submitTelData.disabled = false : submitTelData.disabled = true;
  }

  validateFormData(target, messageH2) {

    switch(true) {
      case target.id === 'firstName' || target.id === 'secondName' || target.id === 'lastName' || target.id === 'citizenship' :
        if (!(/^([а-яё]|[a-z]){2,20}$/i.test(target.value)) && target.value.length > 0) {
          const label = document.querySelector(`[for="${target.id}"]`);

          target.value = '';
          messageH2.innerHTML = (`Пожалуйста, введите корректно: ${label.innerHTML}`);

        } else {
            messageH2.innerHTML = ('');
        }

        break;

        case target.id === 'website' :
          if (!(/[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi.test(target.value)) && target.value.length > 0) {
            target.value = '';
            messageH2.innerHTML = ('Пожалуйста, введите корректно адрес сайта');
          } else {
              messageH2.innerHTML = ('');
          }

        break;

        case target.id === 'email' :
          if (!(/^([a-z]|\d|\_|\-|\.){3,20}@[a-z\d]{1,10}\.[a-z]{2,4}$/i.test(target.value)) && target.value.length > 0) {
            target.value = '';
            messageH2.innerHTML = ('Пожалуйста, введите корректный email');
          } else {
              messageH2.innerHTML = ('');
          }

          break;

        case target.id === 'postCode':
          if (!(/^\d{4,7}$/.test(target.value)) && target.value.length > 0) {
            target.value = '';
            messageH2.innerHTML = ('Пожалуйста, введите корректный индекс');
          } else {
              messageH2.innerHTML = ('');
          }

          break;
        }
    }

    setNewContactData() {
      const firstNameInput = document.getElementById('firstName'),
            secondNameInput = document.getElementById('secondName'),
            lastNameInput = document.getElementById('lastName'),
            birthDateInput = document.getElementById('birthDate'),
            sexMaleInput = document.getElementById('male'),
            sexFemaleInput = document.getElementById('female'),
            citizenshipInput = document.getElementById('citizenship'),
            maritalStatusInput = document.getElementById('maritalStatus'),
            websiteInput = document.getElementById('website'),
            emailInput = document.getElementById('email'),
            companyInput = document.getElementById('company'),
            countryInput = document.getElementById('country'),
            cityInput = document.getElementById('city'),
            streetHouseFlatNumberInput = document.getElementById('streetHouseFlatNumber'),
            postCodeInput = document.getElementById('postCode'),
            actionInfoContainer = document.getElementsByClassName('actionInfoContainer')[0],
            contactTelLines = document.getElementsByClassName('contactTelLine'),
            telData = [];

      const newContactDataObj = {
        id: parseRequestURL().id ? parseRequestURL().id : '',
        firstName: firstNameInput.value,
        secondName: secondNameInput.value,
        lastName: lastNameInput.value ? lastNameInput.value : 'Не указано',
        birthDate: birthDateInput.value ? birthDateInput.value : '',
        sex: sexMaleInput.checked ? 'мужской' : sexFemaleInput.checked ? 'женский' : 'Не указано',
        citizenship: citizenshipInput.value ? citizenshipInput.value : 'Не указано',
        maritalStatus: maritalStatusInput.value ? maritalStatusInput.value : 'Не указано',
        website: websiteInput.value ? websiteInput.value : 'Не указано',
        email: emailInput.value ? emailInput.value : 'Не указано',
        company: companyInput.value ? companyInput.value : 'Не указано',
        address: {
          country: countryInput.value ? countryInput.value : 'Не указано',
          city: cityInput.value ? cityInput.value : 'Не указано',
          streetHouseFlatNumber: streetHouseFlatNumberInput.value ? streetHouseFlatNumberInput.value : 'Не указано',
          postCode: postCodeInput.value ? postCodeInput.value : 'Не указано'
        }
      }

      for (let value of contactTelLines) {
        telData.push({
          "telId": value.dataset.id,
          "countryCode": value.getElementsByClassName('countryCode')[0].innerHTML,
          "operatorCode": value.getElementsByClassName('operatorCode')[0].innerHTML,
          "telephoneNumber": value.getElementsByClassName('telephoneNumber')[0].innerHTML,
          "telephoneType": value.getElementsByClassName('telephoneType')[0].innerHTML,
          "comment": value.getElementsByClassName('comment')[0].innerHTML ? value.getElementsByClassName('comment')[0].innerHTML : ''
        });
      }

      newContactDataObj.telData = telData;

      if (parseRequestURL().action === 'add') {
        this.model.setNewContact(newContactDataObj).then(responseStatus => responseStatus ? actionInfoContainer.innerHTML = ('<h2 class="actionInfo">Контакт успешно добавлен</h2>') : actionInfoContainer.innerHTML = ('<h2 class="actionInfoError">Что-то пошло не так</h2>'));

        location.reload();
      } else if (parseRequestURL().action === 'edit') {
        this.model.editContact(newContactDataObj).then(responseStatus => responseStatus ? actionInfoContainer.innerHTML = ('<h2 class="actionInfo">Контакт успешно изменён</h2>') : actionInfoContainer.innerHTML = ('<h2 class="actionInfoError">Что-то пошло не так</h2>'));
      }
    }

    setNewTelData(popupForm) {
      const popupFormInputs = popupForm.getElementsByTagName('INPUT'),
            submitButton = document.getElementsByClassName('submitTelDataButton')[0],
            telDataObj = {};

      for (let input of popupFormInputs) {
        telDataObj[input.id] = input.value;
      }

      submitButton.dataset.id ?  telDataObj.telId = submitButton.dataset.id : telDataObj.telId = this.getShortId();

      this.drawNewTelData(telDataObj);

      if (submitButton.dataset.action === 'add') {
        this.clearInputs(popupForm);
      }
    }

    getShortId(){
      return Math.random().toString(36).substr(2, 10);
    }

    drawNewTelData(telDataObj) {
      const telDataTable = document.getElementsByClassName('telDataTable')[0],
            telDataTbody = telDataTable.getElementsByTagName('TBODY')[0],
            telTRs = telDataTable.getElementsByTagName('TR');
            
      let trToChange = [];

      for (let value of telTRs) {
        if (value.dataset.id === telDataObj.telId) {
          trToChange = value;
        }
      }

        if (trToChange.length !== 0) {
          trToChange.innerHTML = (`
            <td><input type="checkbox" data-id="${telDataObj.telId}" class="chooseCheckbox"></input></td>
            <td><span class="countryCode">${telDataObj.countryCode}</span><span class="operatorCode">${telDataObj.operatorCode}</span><span class="telephoneNumber">${telDataObj.telephoneNumber}</span></td>
            <td class="telephoneType">${telDataObj.telephoneType}</td>
            <td class="comment">${telDataObj.comment ? telDataObj.comment : '–'}</td>
          `)
        } else {
          telDataTbody.insertAdjacentHTML('beforeend', `
          <tr class="contactTelLine" data-id=${telDataObj.telId} id="${telDataObj.telId}">
            <td><input type="checkbox" data-id="${telDataObj.telId}" class="chooseCheckbox"></input></td>
            <td><span class="countryCode">${telDataObj.countryCode}</span><span class="operatorCode">${telDataObj.operatorCode}</span><span class="telephoneNumber">${telDataObj.telephoneNumber}</span></td>
            <td class="telephoneType">${telDataObj.telephoneType}</td>
            <td class="comment">${telDataObj.comment ? telDataObj.comment : '–'}</td>
          </tr>
          `);
        }

        if (document.getElementsByClassName('initialLine')[0]) {
          document.getElementsByClassName('initialLine')[0].remove();
        }
    }

    clearInputs(createEditContactForm) {
      const createEditFormInputs = createEditContactForm.getElementsByTagName('INPUT');

      for (let value of createEditFormInputs) {
        if (value.getAttribute('type') === 'text') {
          value.value = '';
        }

        if (value.getAttribute('type') === 'radio') {
          value.checked = false;
        }
      }
    }

    getContactsTelHTML(data) {
      let html = [];

      if (data && data.telData && data.telData.length !== 0) {
        const telData = data.telData;

        telData.forEach(tel => {
          html.push(`
            <tr class="contactTelLine" data-id=${tel.telId} id=${tel.telId}>
              <td><input type="checkbox" data-id="${tel.telId}" class="chooseCheckbox"></input></td>
              <td><span class="countryCode">${tel.countryCode}</span><span class="operatorCode">${tel.operatorCode}</span><span class="telephoneNumber">${tel.telephoneNumber}</span></td>
              <td class="telephoneType">${tel.telephoneType}</td>
              <td class="comment">${tel.comment ? tel.comment : '–'}</td>
            </tr>
          `)
        })
      } else {
        html.push(`
          <tr class="initialLine">
            <td>–</td>
            <td>–</td>
            <td>–</td>
            <td>–</td>
          </tr>
        `)
      }

      return html.join('\n');
    }

    showTelActionMessage() {
      const submitActionInfo = document.getElementsByClassName('submitActionInfo')[0];

      submitActionInfo.innerHTML = ('<h2>Данные успешно сохранены</h2>');
    }

    hideMessage() {
      const submitActionInfo = document.getElementsByClassName('submitActionInfo')[0];

      submitActionInfo.innerHTML = ('');
    }
}

export default Contact;
