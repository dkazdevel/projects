import {parseRequestURL} from '../../helpers/utils.js';

import Component from '../../views/component.js';

class About extends Component {
  constructor() {
    super();
  }

  render() {
    return new Promise(resolve => {
      if (parseRequestURL().lang === 'pl') {
        resolve(`
          <div class="content-container__inside">
            <div class="content-container__aboutUs-container">
              <div class="content-container__aboutUs-container__aboutUs">
                <div class="content-container__aboutUs-container__aboutUs__text-container">
                  <h2 class="content-container__aboutUs-container__aboutUs__text-container__h2">Monotonna pracą? Chcesz w końcu cieszyć się pracą? Zapraszamy do świata piękna wraz z naszym autorskim kursem!</h2>
                  <p class="content-container__aboutUs-container__aboutUs__text-container__p">Nazywamy się Solomiia i Ira. Jesteśmy założycielami salonu Keratinboss w Łodzi. Po odbyciu wielu szkoleń prostowania i odbudowy włosów,
                     a także naszego doświadczenia ponad 5 lat w tej dziedzinie - stworzyliśmy własny autorski kurs prostowania włosów, który pozwoli Cię bardzo szybko zacząć zarabiać na twoim hobby i doskonale rozwijać się w tym kierunku.
                  </p>
                </div>
                <div class="content-container__aboutUs-container__aboutUs__img-container">
                  <img class="content-container__aboutUs-container__aboutUs__img-container__img" src="img/IMG_5746.jpg">
                </div>
              </div>
            </div>
            <div class="content-container__video-container">
              <video loop controls playsinline poster="img/poster.png">
                <source src="img/kerotinboss1.mp4" type="video/quicktime" codecs="Timecode, H.264">
                <source src="img/kerotinboss.mp4" type="video/mp4" codecs="Timecode, H.264">
              </video>
            </div>
            <div class="content-container__aboutUs-container">
              <div class="content-container__aboutUs-container__aboutUs">
                <div class="content-container__aboutUs-container__aboutUs__img-container display-left img-mobile-for-remove">
                  <img class="content-container__aboutUs-container__aboutUs__img-container__img" src="img/IMG_5175.png">
                </div>
                <div class="content-container__aboutUs-container__aboutUs__text-container display-right">
                  <h2 class="content-container__aboutUs-container__aboutUs__text-container__h2">Pracujemy na profesjonalnych produktach dostępnych tylko dla osób po szkoleniach. Producent Brazylia. Minimalne opary bez formaldehydu</h2>
                  <p class="content-container__aboutUs-container__aboutUs__text-container__p">Ne pracujemy na jednej keratynie / botoxu i t.d. z Allegro lub Aliexpress.
                    Posiadamy ponad 20 kompozycij dla wszystkich rodzajów włosów i stopnia zniszczenia Indywidualnij dobór składu, techniki dla uzyskania maksymalnego efektu pięknych i zadbanych włosow. Nei wiesz jaki zabieg będzie dla ciebie najlepszy? Nie martw się ! - Pracujemy z głową i duszą, a nie tylko rękami. Efekt gwarantowany, rozsądne ceny.
                    Zapraszamy serdecznie. Dobierzemy najbardziej odpowiednią procedurę dla twoich włosów. Ostrożnie, dbając o zdrowie włosów, spełnimy Twoje marzenie o pięknych i zadbanych włosach.
                  </p>
                </div>
                <div class="content-container__aboutUs-container__aboutUs__img-container display-left img-mobile">
                  <img class="content-container__aboutUs-container__aboutUs__img-container__img" src="img/IMG_5175.png">
                </div>
              </div>
            </div>
            <div class="content-container__button-container">
              <a href="#/courses/pl" class="content-container__button-container__a">Sprawdź nasze szkolenia</a>
            </div>
            <div class="content-container__aboutUs-container">
              <div class="content-container__aboutUs-container__aboutUs">
                <div class="content-container__aboutUs-container__aboutUs__text-container">
                <h2 class="content-container__aboutUs-container__aboutUs__text-container__h2">Wykonujemy:</h2>
                <p class="content-container__aboutUs-container__aboutUs__text-container__p">
                  <span>Nanoplastia</span>
                  <span>Bixiplastia</span>
                  <span>Keratyna</span>
                  <span>Botoks</span>
                  <span>Molekularna regeneracja</span>
                </p>
                </div>
                <div class="content-container__aboutUs-container__aboutUs__img-container">
                  <img class="content-container__aboutUs-container__aboutUs__img-container__img" src="img/IMG_6752.png">
                </div>
              </div>
            </div>
          </div>
        `);
      } else if (parseRequestURL().lang === 'ru') {
        resolve(`
          <div class="content-container__inside">
            <div class="content-container__aboutUs-container">
              <div class="content-container__aboutUs-container__aboutUs">
                <div class="content-container__aboutUs-container__aboutUs__text-container">
                  <h2 class="content-container__aboutUs-container__aboutUs__text-container__h2">Монотонная работа? Вы хотите наконец-то насладиться своей работой? Приглашаем вас в мир красоты с нашим оригинальным курсом!</h2>
                  <p class="content-container__aboutUs-container__aboutUs__text-container__p">Вас приветствует Соломия и Ира. Мы являемся основателями салона Keratinboss в Лодзи. После прохождения множества тренингов по выпрямлению и восстановлению волос,
                   а также имея 5-летний опыт в этой сфере, мы создали собственный запатентованный курс выпрямления волос, который позволит вам очень быстро начать зарабатывать на своем хобби и отлично развиваться в этом направлении.
                  </p>
                </div>
                <div class="content-container__aboutUs-container__aboutUs__img-container">
                  <img class="content-container__aboutUs-container__aboutUs__img-container__img" src="img/IMG_5746.jpg">
                </div>
              </div>
            </div>
            <div class="content-container__video-container">
            <video loop controls playsinline poster="img/poster.png">
              <source src="img/kerotinboss1.mp4" type="video/quicktime" codecs="Timecode, H.264">
              <source src="img/kerotinboss.mp4" type="video/mp4" codecs="Timecode, H.264">
            </video>
            </div>
            <div class="content-container__aboutUs-container">
              <div class="content-container__aboutUs-container__aboutUs">
              <div class="content-container__aboutUs-container__aboutUs__img-container display-left img-mobile-for-remove">
                <img class="content-container__aboutUs-container__aboutUs__img-container__img" src="img/IMG_5175.png">
              </div>
                <div class="content-container__aboutUs-container__aboutUs__text-container display-right">
                  <h2 class="content-container__aboutUs-container__aboutUs__text-container__h2">Мы работаем с профессиональными продуктами, доступными только людям после обучения. Бразильского производства. Наши продукты не содержат в своём составе формальдегид.</h2>
                  <p class="content-container__aboutUs-container__aboutUs__text-container__p">Не работем с ботоксом, кератином с Allegro или Aliexpress. У нас более 20 составов для всех типов волос и различной степени повреждения.
                  Индивидуально подбираем состав, техники, чтобы получить максимальный эффект красивых и ухоженных волос. Если вы не знаете какая процедура подойдет именно вам, не волнуйтесь - работаем головой и душой, а не только руками. Гарантированный результат, разумные цены.
                  Сердечно приглашаем вас и подберем наиболее подходящую для ваших волос процедуру. Тщательно заботясь о здоровье ваших волос, мы воплотим в реальность вашу мечту о красивых и ухоженных волосах.
                  </p>
                </div>
                <div class="content-container__aboutUs-container__aboutUs__img-container display-left img-mobile">
                  <img class="content-container__aboutUs-container__aboutUs__img-container__img" src="img/IMG_5175.png">
                </div>
              </div>
            </div>
            <div class="content-container__button-container">
              <a href="#/courses/ru" class="content-container__button-container__a">Наши курсы</a>
            </div>
            <div class="content-container__aboutUs-container">
              <div class="content-container__aboutUs-container__aboutUs">
                <div class="content-container__aboutUs-container__aboutUs__text-container">
                <h2 class="content-container__aboutUs-container__aboutUs__text-container__h2">Предоставляемые услуги:</h2>
                <p class="content-container__aboutUs-container__aboutUs__text-container__p">
                  <span>Нанопластика</span>
                  <span>Биксипластия</span>
                  <span>Кератин</span>
                  <span>Ботокс</span>
                  <span>Молекулярная регенерация</span>
                </p>

                </div>
                <div class="content-container__aboutUs-container__aboutUs__img-container">
                  <img class="content-container__aboutUs-container__aboutUs__img-container__img" src="img/IMG_6752.png">
                </div>
              </div>
            </div>
          </div>
        `);
      }
    });
  }

  afterRender(){
    this.setActions();
  }

  setActions() {
    }

}

export default About;
