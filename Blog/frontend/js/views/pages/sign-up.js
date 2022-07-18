import Component from "../component";
import { parseRequestURL } from "../../helpers/utils";
import BlogModel from "../../models/blog-model";

class SignUp extends Component {
  constructor() {
    super();

    this.model = new BlogModel();
  }

  render() {
    return new Promise((resolve) => {
      console.log(parseRequestURL());
      if (parseRequestURL().resource === "log-in") {
        resolve(`
            <form class="text-center authForm logIn">
            <img class="mb-4" src="https://img.favpng.com/19/16/16/computer-icons-blogger-logo-png-favpng-B7KarAb7aWnaBXeV9dtiJcVjb.jpg" alt="" width="72" height="57">
            <h1 class="h3 mb-3 fw-normal">Please log in</h1>
        
            <div class="form-floating">
              <input id="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input id="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
              <label for="floatingPassword">Password</label>
            </div>
        
            <p class="mt-5 mb-3 text-muted formInfo"></p>
            <button disabled class="w-100 btn btn-lg btn-primary submitButton" type="submit">Log in</button>
            <a href="#/sign-up" class="mt-5 mb-3 text-muted">Want to sign up?</a>
            <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
          </form>
      `);
      } else if (parseRequestURL().resource === "sign-up") {
        resolve(`
            <form class="text-center authForm signUp">
            <img class="mb-4" src="https://img.favpng.com/19/16/16/computer-icons-blogger-logo-png-favpng-B7KarAb7aWnaBXeV9dtiJcVjb.jpg" alt="" width="72" height="57">
            <h1 class="h3 mb-3 fw-normal">Please sign up</h1>
        
            <div class="form-floating">
              <input id="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input id="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
              <label for="floatingPassword">Password</label>
            </div>
            <div class="form-floating">
              <input id="username" type="text" class="form-control lastInput" id="floatingUserName" placeholder="Username">
              <label for="floatingPassword">Username</label>
            </div>
       
            <p class="mt-5 mb-3 text-muted formInfo"></p>
            <button disabled class="w-100 btn btn-lg btn-primary submitButton" type="submit">Sign up</button>
            <a href="#/log-in" class="mt-5 mb-3 text-muted">Want to log in?</a>
            <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
          </form>
      `);
      }
    });
  }

  afterRender() {
    this.setActions();
  }

  setActions() {
    const form = document.getElementsByClassName("authForm")[0],
      formInfo = document.getElementsByClassName("formInfo")[0];

    form.addEventListener("change", (event) => {
      const target = event.target;

      this.validateFormData(target, formInfo);
      this.isSubmitButtonActive(form);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      this.setNewUserData(form, formInfo);
    });
  }

  validateFormData(target, formInfo) {
    switch (true) {
      case target.id === "username":
        if (
          !/^([а-яё]|[a-z]){2,20}$/i.test(target.value) &&
          target.value.length > 0
        ) {
          target.value = "";
          formInfo.innerHTML = `Please, enter correct ${target.id}`;
        } else {
          formInfo.innerHTML = "";
        }

        break;

      case target.id === "email":
        if (
          !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            target.value
          ) &&
          target.value.length > 0
        ) {
          target.value = "";
          formInfo.innerHTML = `Please, enter correct ${target.id}`;
        } else {
          formInfo.innerHTML = "";
        }

        break;

      case target.id === "password":
        if (target.value.length < 6) {
          target.value = "";
          formInfo.innerHTML = `Password must be at least 6 characters`;
        } else {
          formInfo.innerHTML = "";
        }

        break;
    }
  }

  isSubmitButtonActive(form) {
    const inputsArr = form.getElementsByTagName("INPUT"),
      submitButton = document.getElementsByClassName("submitButton")[0];

    let counter = 0;

    for (let input of inputsArr) {
      if (input.value) {
        counter++;
      }
    }

    counter > 0
      ? (submitButton.disabled = false)
      : (submitButton.disabled = true);
  }

  setNewUserData(form, formInfo) {
    const inputsArr = form.getElementsByTagName("INPUT"),
      objToSend = {};
    for (let input of inputsArr) {
      objToSend[input.id] = input.value;
    }
    if (form.classList.contains("signUp")) {
      this.model
        .sendSignUpData(objToSend)
        .then((response) =>
          response
            ? this.saveUserData(response)
            : (formInfo.innerHTML = 'You entered incorrect data')
        );
    } else {
      this.model
        .sendLogInData(objToSend)
        .then((response) =>
          response
            ? this.saveUserData(response)
            : (formInfo.innerHTML = 'You entered incorrect data')
        );
    }
  }

  saveUserData(response) {
    console.log(response);
    localStorage.setItem("userData", JSON.stringify(response.user));
    location.hash = `#`;
  }
}

export default SignUp;
