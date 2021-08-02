import {parseRequestURL} from './helpers/utils.js';

import Header from './views/partials/header.js';
import Footer from './views/partials/footer.js';

import About from './views/pages/about.js';
import ChooseLang from './views/pages/chooseLang.js';
import Courses from './views/pages/courses.js';
import Contact from './views/pages/contact.js';
import Error404 from './views/pages/error404.js';

const Routes = {
  '/': ChooseLang,
  '/courses': ChooseLang,
  '/about': ChooseLang,
  '/contact': ChooseLang,
  '/about/:lang': About,
  '/courses/:lang': Courses,
  '/contact/:lang': Contact
};

function router() {
  const headerContainer = document.getElementsByClassName('header-container')[0],
        contentContainer = document.getElementsByClassName('content-container')[0],
        footerContainer = document.getElementsByClassName('footer-container')[0],
        header = new Header(),
        footer = new Footer();

  const request = parseRequestURL(),
        parsedURL = `/${request.resource ? `${request.resource}` : ''}${request.lang ? '/:lang' : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    		  page.render().then(html => {
            document.body.scrollTop = document.documentElement.scrollTo({
              top: 0,
              behavior: "instant"
            });
            contentContainer.innerHTML = html;
            removeContainerStyles();
      			page.afterRender();
  		    });


    if (request.lang) {
      footer.render().then(html => footerContainer.innerHTML = html);
    } else {
      footerContainer.innerHTML = '';
    }

    if (request.lang) {
      header.render().then(html => headerContainer.innerHTML = html).then(() => header.afterRender());
    } else {
      headerContainer.innerHTML = '';
    }

    if (request.lang === 'pl') {
      document.documentElement.lang = 'pl';
    } else if (request.lang === 'ru') {
      document.documentElement.lang = 'ru';
    } else {
      document.documentElement.lang = 'en';
    }
}

function removeContainerStyles() {
  const contentContainer = document.getElementsByClassName('content-container')[0];

  contentContainer.classList.remove('content-container-opacity');

}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
window.addEventListener('onpopstate', router);
