import Component from '../../views/component';
import Concerts from '../../models/concerts';

import AboutTemplate from '../../../templates/pages/about';


class About extends Component {
  constructor() {
    super();

    this.model = new Concerts();
  }

  render() {
    return new Promise(resolve => {
      resolve(AboutTemplate());
    });
  }

  afterRender(){
    this.setActions();
  }

  setActions() {
    const submitForm = document.getElementsByClassName('contact-form')[0],
    formNameInput = document.getElementsByClassName('form-name')[0],
    formTelInput = document.getElementsByClassName('form-tel')[0],
    formEmailInput = document.getElementsByClassName('form-email')[0]

    formNameInput.addEventListener('change', () => {
      if (!(/^([а-яё]|[a-z]){2,15}$/i.test(formNameInput.value)) && formNameInput.value.length > 0) {
        formNameInput.value ='';
        alert('Please enter the correct name');
      }
    });

    formTelInput.addEventListener('change', () => {
      if (!(/^\+?[\d]{5,9}$/i.test(formTelInput.value)) && formTelInput.value.length > 0) {
        formTelInput.value ='';
        alert('Please enter the correct number');
      }
    });

    formEmailInput.addEventListener('change', () => {
      if (!(/^([a-z]|\d|\_|\-|\.){3,20}@[a-z\d]{1,10}\.[a-z]{2,4}$/i.test(formEmailInput.value)) && formEmailInput.value.length > 0) {
        formEmailInput.value ='';
        alert('Please enter a valid email address');
      }
    });

    submitForm.addEventListener('submit', event => {
      event.preventDefault();

      if (formNameInput.value != '' && formTelInput.value != '' && formEmailInput.value != '') {
        this.submitFormActions(formNameInput, formTelInput, formEmailInput);
      } else {
        alert('Please enter all the data')
      }
  });
}

  submitFormActions(formNameInput, formTelInput, formEmailInput){
    const contactObj = {
      'name': formNameInput.value,
      'telNumber': formTelInput.value,
      'email': formEmailInput.value
    }

    this.model.sendEmail(contactObj);

    alert('Thank you, we will contact you');

    formEmailInput.value = '';
    formTelInput.value = '';
    formNameInput.value = '';
  }

}

export default About;
