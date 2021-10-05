import SearchResult from './views/pages/searchResult';
import Error404 from './views/pages/error404';

import '../styles/app';
import '../js/less/less.min';

import {parseRequestURL} from './helpers/utils';

const Routes = {
  '/': SearchResult
};

function router() {
  const contentContainer = document.getElementsByClassName('content-container')[0];

  const   request = parseRequestURL(),
          parsedURL = `/${request.resource || ''}`,
          page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.getData().then(data => {
      page.render(data).then(html => {
        contentContainer.innerHTML = html;

        page.afterRender(data);
      });
});

  localStorage.clear();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
