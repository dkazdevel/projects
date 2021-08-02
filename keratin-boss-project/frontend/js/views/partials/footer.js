import Component from '../../views/component.js';
import {parseRequestURL} from '../../helpers/utils.js';

const request = parseRequestURL();
class Footer extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
              <div class="footer">
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
                        developed by: <a href="mailto:dkaz.devel@gmail.com"style="color:#ffffff">dkaz.devel</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            `);
        });
    }
}

export default Footer;
