import { getUserToken, parseRequestURL } from "../helpers/utils.js";

class Component {
  constructor() {
    this.request = parseRequestURL();
  }

  getData() {
    return new Promise((resolve) => resolve());
  }

  afterRender() {
    if (getUserToken()) {
      const logOutButton = document.getElementsByClassName("logOut")[0];

      logOutButton.addEventListener("click", () => {

        localStorage.setItem("userData", JSON.stringify({}));
        location.hash = "#";
        location.reload();
      });
    }
  }
}

export default Component;
