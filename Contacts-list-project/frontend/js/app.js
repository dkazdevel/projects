import '../styles/app';
import '../js/less/less.min';

import {parseRequestURL} from './helpers/utils';

import Header from './views/partials/header';
import Footer from './views/partials/footer';

import List from './views/pages/list';
import Contact from './views/pages/contact';
import Search from './views/pages/search';
import Error404 from './views/pages/error404';

const Routes = {
  '/': List,
  '/contact/add': Contact,
  '/contact/edit/:id': Contact,
  '/contacts/list/:id': List,
  '/contact/search': Search,
  '/contacts/searchList/:id': List,
  '/contacts/searchList/:id/:pageId': List
};

function router() {
  const headerContainer = document.getElementsByClassName('header-container')[0],
        contentContainer = document.getElementsByClassName('content-container')[0],
        footerContainer = document.getElementsByClassName('footer-container')[0],
        header = new Header(),
        footer = new Footer();

  header.render().then(html => headerContainer.innerHTML = html);

  const request = parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.action ? `/${request.action}` : ''}${request.id ? `/:id` : ''}${request.pageId ? `/:pageId` : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.getData().then(data => {
      page.render(data).then(html => {
        contentContainer.innerHTML = html;

        page.afterRender(data);
      });
    });

  footer.render().then(html => footerContainer.innerHTML = html);
}

module.hot ? module.hot.accept(router()) : window.addEventListener('load', router);
window.addEventListener('hashchange', router);
