import Component from '../../views/component';

import Admin from '../../models/admin';

import AdminLoginTemplate from '../../../templates/pages/admin/adminLogin';

class AdminLogin extends Component {
  constructor() {
		super();

		this.model = new Admin();
	}

  render() {
		return new Promise(resolve => {
			resolve(AdminLoginTemplate());
		});
  }

  afterRender(){
    this.setActions();
  }

  setActions() {
    const loginInput = document.getElementById('userLogin'),
    passwordInput = document.getElementById('userPassword'),
    submitForm = document.getElementsByClassName('info_part__concerts-container__order-info-container__form')[0],
    submitButton = document.getElementsByClassName('info_part__concerts-container__order-info-container__form__button-confirm')[0];

    loginInput.addEventListener('change', () => {this.isButtonActive(loginInput, passwordInput, submitButton)});
    passwordInput.addEventListener('change', () => {this.isButtonActive(loginInput, passwordInput, submitButton)});

    submitForm.addEventListener('submit', event => {
      event.preventDefault();
      this.model.authenticateUser({'login': loginInput.value, 'password': passwordInput.value}).then((loginResult) => this.afterLogin(loginResult, loginInput, passwordInput));
    });
  }

  isButtonActive(loginInput, passwordInput, submitButton){
    if (loginInput.value != '' && passwordInput.value != '') {
      submitButton.classList.add('submit-button-active');
    } else {
      submitButton.classList.remove('submit-button-active');
    }
  }

  afterLogin(loginResult, loginInput, passwordInput) {
    loginResult === 'Succeed' ? this.redirectToAdminPage() : this.showError(loginInput, passwordInput);
  }

  redirectToAdminPage(){
    location.hash = '#/adminPage'
  }

  showError(loginInput, passwordInput) {
    loginInput.value = '';
    passwordInput.value = '';
    alert('Invalid username or password');
  }

}

export default AdminLogin;
