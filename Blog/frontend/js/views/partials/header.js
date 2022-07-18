import Component from "../../views/component";
import { getUserToken, parseRequestURL } from "../../helpers/utils";

class Header extends Component {
  render() {
    return new Promise((resolve) => {
      resolve(`<div class="row flex-nowrap justify-content-between align-items-center">
      <div class="col-4 pt-1">
        <a class="link-secondary" href="#">Top Blog</a>
      </div>
      <div class="col-4 text-center">
        <a class="blog-header-logo text-dark" href="#">BLOG</a>
      </div>
      <div class="col-4 d-flex justify-content-end align-items-center">
      ${this.getHeaderData()}
      </div>
    </div>
`);
    });
  }

  getHeaderData() {
    if (getUserToken()) {
      return `
            <div class="user-logo-container">
                <img class="header-user-logo" src="https://res.cloudinary.com/agroex-backend/image/upload/v1658176930/user_lyxla5.png"></img>
               <p class="header-user-p">My account</p>
               <ul class="dropdown-menu position-absolute d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                <li><a class="dropdown-item rounded-2 ${
                  parseRequestURL().resource === "" ? "active" : ""
                }" href="#">Main page</a></li>
                <li><a class="dropdown-item rounded-2 ${
                  parseRequestURL().resource === "my-posts" ? "active" : ""
                }" href="#/my-posts">My posts</a></li>
                <li><a class="dropdown-item rounded-2 ${
                  parseRequestURL().resource === "create-post" ? "active" : ""
                }" href="#/create-post">Create Post</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item rounded-2 logOut" href="#">Log out</a></li>
            </ul>
            </div>
            
          
            `;
    }

    return `<a class="btn btn-sm btn-outline-secondary firstLink" href="#/sign-up">Sign up</a>
            <a class="btn btn-sm btn-outline-secondary" href="#/log-in">Log in</a>`;
  }

  afterRender() {
    this.setActions();
  }

  setActions() {
    if (getUserToken()) {
      const userLogo = document.getElementsByClassName("header-user-logo")[0],
        userText = document.getElementsByClassName("header-user-p")[0],
        dropDown = document.getElementsByClassName("dropdown-menu")[0];

      document.addEventListener("click", (event) => {
        event.stopPropagation();

        if (event.target === userLogo || event.target === userText) {
          dropDown.classList.add("drop-down-active");
        } else {
          dropDown.classList.remove("drop-down-active");
        }
      });
    }
  }
}

export default Header;
