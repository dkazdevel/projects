import {parseRequestURL} from '../../helpers/utils';

import Component from '../component';

import Contacts from '../../models/contacts';



class List extends Component {
  constructor() {
    super();

    this.model = new Contacts();
  }

  getData() {
    if (parseRequestURL().action != 'searchList') {
      return new Promise(resolve => this.model.getContactsList().then(data => resolve(data)));
    } else if (parseRequestURL().action === 'searchList') {
      return new Promise(resolve => this.model.getFoundContactsList(parseRequestURL().id).then(data => data ? resolve(data[0].foundContacts) : resolve(location.hash = '/error404')));
    }
  }

  render(contactsData) {
    return new Promise(resolve => {
      resolve(`
              <div class="content-container__inside-container">
                <h2 class="formInfoH2"></h2>
                <table class="content-container__inside-container__table-container">
                  <tr>
                    ${parseRequestURL().action === 'searchList' ? '<td colspan="3"><input class="resetSearchButton" type="button" value="Очистить поиск"></td>' : '<td colspan="3"></td>'}
                    <td colspan="3" class="buttonsTd">
                      <input class="deleteButton" type="button" value="Удалить" disabled></input>
                      <input class="searchButton" type="button" value="Поиск">
                      <input type="button" class="createNewContactButton" value="Создать новый контакт">
                    </td>
                  </tr>
                  <tr class="first-line">
                    <td>Выбрать</td>
                    <td>Полное имя</td>
                    <td>Дата рождения</td>
                    <td>Адрес</td>
                    <td>Фирма</td>
                    <td>Редактировать</td>
                  </tr>
                  ${this.getContactsHTML(contactsData)}
                </table>
                <div class="content-container__inside-container__buttons-next-prev">
                  <a ${this.getPrevButtonAttributes()}>Prev</a>
                  ${this.getNavigationButtonsHTML(contactsData)}
                  <a ${this.getNextButtonAttributes(contactsData)}>Next</a>
                </div>
              </div>
                    `);
    });
  }

  afterRender(contactsData){
    this.setActions(contactsData);
  }

  setActions(contactsData) {
    const createNewContactButton = document.getElementsByClassName('createNewContactButton')[0],
    deleteButton = document.getElementsByClassName('deleteButton')[0],
    searchButton = document.getElementsByClassName('searchButton')[0],
    resetSearchButton = document.getElementsByClassName('resetSearchButton')[0],
    tableContainer = document.getElementsByClassName('content-container__inside-container__table-container')[0],
    checkedCheckboxes = localStorage.getItem('checkedCheckboxes') ? JSON.parse(localStorage.getItem('checkedCheckboxes')) : [];

    window.onload = this.setOnloadActions(checkedCheckboxes, deleteButton, searchButton, contactsData);
    tableContainer.addEventListener('click', event => this.clickedCheckboxActions(event.target, checkedCheckboxes, deleteButton));
    createNewContactButton.addEventListener('click', () => location.hash = `/contact/add`);
    deleteButton.addEventListener('click', () => this.deleteActions(checkedCheckboxes));
    searchButton.addEventListener('click', () => location.hash = `/contact/search`);
    parseRequestURL().action === 'searchList' && resetSearchButton.addEventListener('click', () => this.model.resetSearch().then(() => location.hash = '/'));
  }

  clickedCheckboxActions(target, checkedCheckboxes, deleteButton) {

    if (target.tagName === 'INPUT' && target.getAttribute('type') === 'checkbox') {
      if (target.checked) {
        checkedCheckboxes.push(target.dataset.id)
      } else {
        let index = checkedCheckboxes.indexOf(target.dataset.id);

        index !== -1 && checkedCheckboxes.splice(index, 1);
      }
    }

    checkedCheckboxes.length > 0 ? deleteButton.disabled = false : deleteButton.disabled = true;
    localStorage.setItem('checkedCheckboxes', JSON.stringify(checkedCheckboxes));
  }

  setOnloadActions(checkedCheckboxes, deleteButton, searchButton, contactsData) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    if (parseRequestURL().id === '0' || parseRequestURL().pageId === '0') {
      if (parseRequestURL().action === 'searchList') {
        location.hash = `/${parseRequestURL().resource}/${parseRequestURL().action}/${parseRequestURL().id}/1`
      } else {
        location.hash = `/${parseRequestURL().resource}/${parseRequestURL().action}/1`
      }
    }

    for (let value of checkboxes) {
      if (checkedCheckboxes.includes(value.dataset.id)) {

        value.checked = true;
      } else value.checked = false;
    }

    checkedCheckboxes.length > 0 ? deleteButton.disabled = false : deleteButton.disabled = true;

    contactsData.length === 0 ? searchButton.disabled = true : searchButton.disabled = false;
  }

  deleteActions(checkedCheckboxes) {
    const formInfoH2 = document.getElementsByClassName('formInfoH2')[0];

    this.model.deleteContacts(checkedCheckboxes).then(() => {
      localStorage.clear()
      this.checkIsDataToShow();
    });

    formInfoH2.innerHTML = ('Удаление произведено успешно');
  }

  checkIsDataToShow() {
    let interval = this.getInterval();

    if (parseRequestURL().action === 'searchList') {
      let searchId = parseRequestURL().id;

      this.model.getFoundContactsList(searchId).then(data => {
        if (data.length !== 0) {
          const foundContacts = data[0].foundContacts;

          if (interval[0] >= foundContacts.length) {
            location.hash = `#/contacts/searchList/${searchId}/${parseRequestURL().pageId - 1}`;
          } else {
            location.reload();
          }
        } else {
            location.hash = `#`;
            location.reload();
        }

      })
    } else {
      this.model.getContactsList().then(data => {
        if (data.length !== 0) {
        
          if (interval[0] >= data.length) {
            location.hash = `#/contacts/list/${parseRequestURL().id - 1}`;
          } else {
            location.reload();
          }
        } else {
          location.hash = `#`;
          location.reload();
        }
      })
    }
  }

  getInterval() {
    let url = parseRequestURL(),
        urlCounter;

    if (url.action === 'searchList') {
      urlCounter = url.pageId ? url.pageId : 1;

      return url.pageId === undefined ? [0, 9] : [(urlCounter - 1) * 10, urlCounter * 10 - 1];
    } else {
      urlCounter = url.id ? url.id : 1;

      return url.resource === '' ? [0, 9] : [(urlCounter - 1) * 10, urlCounter * 10 - 1];
    }

  }

  getContactsHTML(contactsData) {
    let html = [],
        [intervalStart, intervalEnd] = this.getInterval(),
        filteredData = [];

    if (contactsData.length === 0) {
      html.push(`
        <tr>
          <td>–</td>
          <td>–</td>
          <td>–</td>
          <td>–</td>
          <td>–</td>
          <td>–</td>
        </tr>
      `)
    } else {
      for (let i=0; i< contactsData.length; i++) {
        if (intervalStart <= i && i <= intervalEnd) {

          filteredData.push(contactsData[i]);
        }
      }

      if (filteredData.length > 0) {
        filteredData.forEach(contact => {
          html.push(`
            <tr data-id=${contact.id}>
              <td><input type="checkbox" data-id="${contact.id}" class="deleteCheckbox"></input></td>
              <td><a href="#/contact/edit/${contact.id}">${contact.firstName} ${contact.lastName === 'Не указано' ? '' : contact.lastName} ${contact.secondName}</a></td>
              <td>${contact.birthDate === '' ? '–' : contact.birthDate}</td>
              <td>${this.getAddressInfo(contact.address)}</td>
              <td>${contact.company === 'Не указано' ? '–' : contact.company}</td>
              <td><a href="#/contact/edit/${contact.id}" type="button" value="">✎</a></td>
            </tr>
          `)
        })
      } else {
        if (parseRequestURL().action === 'searchList') {
          if (parseRequestURL().pageId === '0') {
            location.hash = `/contacts/searchList/${parseRequestURL().id}/0`;
          } else {
            location.hash = `/contacts/searchList/${parseRequestURL().id}/${Math.ceil(contactsData.length/10)}`;
          }
        } else {
          if (parseRequestURL().id === '0') {
            location.hash = `/contacts/list/0`;
          } else {
            location.hash = `/contacts/list/${Math.ceil(contactsData.length/10)}`;
          }
        }
      }
    }

    return html.join('\n');

  }

  getAddressInfo(addressObj) {
    let overallInfoCount = 0,
        withoutInfoCount = 0,
        infoToReturn = '';

    for (let value in addressObj) {
      addressObj[value] === 'Не указано' ? withoutInfoCount++ : infoToReturn === '' ? infoToReturn+=`${addressObj[value]}` : infoToReturn+=`, ${addressObj[value]}`;
      overallInfoCount++;
    }

    return withoutInfoCount === overallInfoCount ? '–' : infoToReturn;

  }

  getNavigationButtonsHTML(contactsData) {
    let html = [];

    for (let i=1; i <= Math.ceil(contactsData.length / 10); i++) {
      html.push(
        `
        <a class="${this.isNavigationButtonActive(i)}" href="${parseRequestURL().action === 'searchList' ? `#/contacts/searchList/${parseRequestURL().id}/${i}` : `#/contacts/list/${i}`}">${i}</a>
        `
      )
    }

    return html.join('\n');
  }

  isNavigationButtonActive(page) {
    const activePage = this.getActivePage();

    return page === +activePage ? 'activeNavigationButton navigationButton' : 'navigationButton';
  }

  getPrevButtonAttributes() {
    const activePage = this.getActivePage();

    return activePage > 1 ? `href="${this.getHrefToButtons()}${+activePage - 1}" class="navigationButton"` : 'class="disabled navigationButton"';
  }

  getNextButtonAttributes(contactsData) {
    const activePage = this.getActivePage();

    return activePage < Math.ceil(contactsData.length / 10) ? `href="${this.getHrefToButtons()}${+activePage + 1}" class="navigationButton"` : 'class="disabled navigationButton"';
  }

  getActivePage() {
    if (parseRequestURL().action === 'searchList') {
      return parseRequestURL().pageId ? parseRequestURL().pageId : 1;
    } else {
      return parseRequestURL().resource !== '' ? parseRequestURL().id : 1;
    }
  }

  getHrefToButtons() {
    if (parseRequestURL().action === 'searchList') {
      return `#/contacts/searchList/${parseRequestURL().id}/`
    } else {
      return '#/contacts/list/'
    }
  }
}


export default List;
