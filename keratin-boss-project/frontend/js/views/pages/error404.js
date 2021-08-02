import {parseRequestURL} from '../../helpers/utils.js';

import Component from '../../views/component.js';

class Error404 extends Component {
    render() {
        return new Promise(resolve => {
          if (parseRequestURL().lang) {
            resolve(`
              <div class="container-404 container404-padding">
                <h1 class="page-title">404 Error - Page Not Found</h1>
              </div>
              `);
          } else {
            resolve(`
              <div class="container-404">
                <header class="d-flex flex-wrap justify-content-center py-3 mb-4 header404">
                  <a href="#/about" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <span class="fs-4">KeratinBoss</span>
                  </a>
                  <ul class="nav nav-pills">
                    <li class="nav-item"><a href="#/about" class="nav-link about" aria-current="page">Main</a></li>
                  </ul>
                </header>
                <h1 class="page-title">404 Error - Page Not Found</h1>
                <div class="footer footer404">
                  <div class="footer__box">
                    <div class="footer__box__text">
                      <div class="footer__box__text__leftpart">
                        <p class="footer__box__text__leftpart__name">
                          KeratinBoss
                        </p>
                        <p class="footer__box__text__leftpart__name__number">Łódź, Piotrkowska 82
                        </p>
                      </div>
                      <div class="footer__box__text__rightpart">
                        <p class="footer__box__text__leftpart__name">
                        +48 884 960 413
                        </p>
                        <p class="footer__box__text__leftpart__name__number">
                          <a href="mailto:" style="color:#ffffff">biuro@KeratinBoss.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `);
          }
        });
    }
}

export default Error404;
