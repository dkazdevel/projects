import "../styles/reset.css";
import "../styles/styles.css";

import { parseRequestURL } from "./helpers/utils";

import Header from "./views/partials/header";
import Footer from "./views/partials/footer";

import Blog from "./views/pages/blog";
import Error404 from "./views/pages/error404";
import SignUp from "./views/pages/sign-up";
import Post from "./views/pages/post";
import MyPosts from "./views/pages/myPosts";


const Routes = {
  "/": Blog,
  "/sign-up": SignUp,
  "/log-in": SignUp,
  "/create-post": Post,
  "/my-posts": MyPosts,
  "/edit/:slug": Post,
};

function router() {
  const headerContainer = document.getElementsByClassName("blog-header")[0],
    contentContainer = document.getElementsByClassName("content-container")[0],
    footerContainer = document.getElementsByClassName("blog-footer")[0],
    body = document.getElementsByTagName("BODY")[0],
    header = new Header(),
    footer = new Footer();

  const request = parseRequestURL(),
    parsedURL = `/${request.resource || ""}${request.slug ? `/:slug` : ""}`,
    page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

  if (!(page instanceof SignUp)) {
    headerContainer.classList.remove("displayNone");
    header.render().then((html) => {
      headerContainer.innerHTML = html;

      header.afterRender();
    });
  } else {
    headerContainer.classList.add("displayNone");
  }

  page.getData().then((data) => {
    page.render(data).then((html) => {
      contentContainer.innerHTML = html;

      page.afterRender(data);
    });
  });

  if (!(page instanceof SignUp)) {
    body.classList.remove("bodySignUp");
    contentContainer.classList.remove("form-signin");
    contentContainer.classList.remove("w-100");
    contentContainer.classList.remove("m-auto");
    footerContainer.classList.remove("displayNone");
    footer.render().then((html) => (footerContainer.innerHTML = html));
  } else {
    body.classList.add("bodySignUp");
    contentContainer.classList.add("form-signin");
    contentContainer.classList.add("w-100");
    contentContainer.classList.add("m-auto");
    footerContainer.classList.add("displayNone");
  }
}

module.hot
  ? module.hot.accept(router())
  : window.addEventListener("load", router);
window.addEventListener("hashchange", router);
