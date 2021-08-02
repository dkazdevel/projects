import '../styles/app';
import '../js/less/less.min';

import {parseRequestURL} from './helpers/utils';

import Header from './views/partials/header';
import Footer from './views/partials/footer';

import About from './views/pages/about';
import Error404 from './views/pages/error404';

import ConcertList from './views/pages/concertList';
import ConcertBooking from './views/pages/concertBooking';
import OrderConfirmation from './views/pages/orderConfirm';

import AdminLogin from './views/pages/adminLogin';
import AdminPage from './views/pages/adminPage';

const Routes = {
  '/': About,
  '/concerts': ConcertList,
  '/concerts/:concertId': ConcertBooking,
  '/concerts/:concertId/:seatId/confirm': OrderConfirmation,
  '/admin': AdminLogin,
  '/adminPage': AdminPage
};

function router() {
  const headerContainer = document.getElementsByClassName('header-container')[0],
        contentContainer = document.getElementsByClassName('info_part')[0],
        footerContainer = document.getElementsByClassName('footer-container')[0],
        header = new Header(),
        footer = new Footer();

  header.render().then(html => headerContainer.innerHTML = html);

  const request = parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.concertId ? '/:concertId' : ''}${request.seatId ? '/:seatId' : ''}${request.action ? `/${request.action}` : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

  Promise.all([
    page.getData(),
    page.getConcertSeatsData()]).then(data => {
      page.render(data).then(html => {
        contentContainer.innerHTML = html;

        page.afterRender(data);
      });
    });

  footer.render().then(html => footerContainer.innerHTML = html);
}

module.hot ? module.hot.accept(router()) : window.addEventListener('load', router);
window.addEventListener('hashchange', router);
