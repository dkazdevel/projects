import {parseRequestURL} from '../../helpers/utils.js';

import Component from '../../views/component.js';

class Header extends Component {
    render() {
      return new Promise(resolve => {
        if (parseRequestURL().lang === 'pl') {
          resolve(`
            <div class="container">
              <header class="d-flex flex-wrap justify-content-center py-3 mb-4">
                <a href="#/about/pl" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                  <span class="fs-4">KeratinBoss</span>
                </a>
                <ul class="nav nav-pills">
                  <li class="nav-item"><a href="#/about/pl" class="nav-link about" aria-current="page">O nas</a></li>
                  <li class="nav-item"><a href="#/courses/pl" class="nav-link courses">Szkolenia</a></li>
                  <li class="nav-item"><a href="https://keratinboss.booksy.com" class="nav-link" target="_blank">Zarezerwuj wizytę</a></li>
                  <li class="nav-item"><a href="#/contact/pl" class="nav-link contact">Kontakt</a></li>
                  <div class="menu-burger__header">
                    <span></span>
                  </div>
                </ul>
              </header>
              <div class="header__nav">
                <ul class="header__menu">
                <li class="nav-link menu__item"><a href="#/about/pl" class="nav-link about" aria-current="page">O nas</a></li>
                <li class="nav-link menu__item"><a href="#/courses/pl" class="nav-link courses">Szkolenia</a></li>
                <li class="nav-link menu__item"><a href="https://keratinboss.booksy.com" class="nav-link" target="_blank">Zarezerwuj wizytę</a></li>
                <li class="nav-link menu__item"><a href="#/contact/pl" class="nav-link contact">Kontakt</a></li>
                </ul>
              </div>
            </div>
          `);
        } else if (parseRequestURL().lang === 'ru'){
          resolve(`
            <div class="container">
              <header class="d-flex flex-wrap justify-content-center py-3 mb-4">
                <a href="#/about/pl" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                  <span class="fs-4">KeratinBoss</span>
                </a>
                <ul class="nav nav-pills">
                  <li class="nav-item"><a href="#/about/ru" class="nav-link about" aria-current="page">О нас</a></li>
                  <li class="nav-item"><a href="#/courses/ru" class="nav-link courses">Курсы</a></li>
                  <li class="nav-item"><a href="https://keratinboss.booksy.com" class="nav-link" target="_blank">Забронируй визит</a></li>
                  <li class="nav-item"><a href="#/contact/ru" class="nav-link contact">Контакт</a></li>
                  <div class="menu-burger__header">
                    <span></span>
                  </div>
                </ul>
              </header>
              <div class="header__nav">
                <ul class="header__menu">
                <li class="nav-link menu__item"><a href="#/about/ru" class="nav-link about" aria-current="page">О нас</a></li>
                <li class="nav-link menu__item"><a href="#/courses/ru" class="nav-link courses">Курсы</a></li>
                <li class="nav-link menu__item"><a href="https://keratinboss.booksy.com" class="nav-link" target="_blank">Забронируй визит</a></li>
                <li class="nav-link menu__item"><a href="#/contact/ru" class="nav-link contact">Контакт</a></li>
                </ul>
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
    const header = document.getElementsByClassName('header-container')[0],
    headerLinks = document.getElementsByClassName('nav-link'),
    burgerMenu = document.getElementsByClassName('menu-burger__header')[0],

    request = parseRequestURL();

    window.onscroll = () => {
      if (window.scrollY > 77) {
          header.classList.add('header-active');
      } else {
          header.classList.remove('header-active');
      }
    };

    for (let i=0; i < headerLinks.length; i++) {
      if (request.resource === 'about') {
        if (headerLinks[i].classList.contains('about')) {
          headerLinks[i].classList.add('active');
        } else {
          headerLinks[i].classList.remove('active');
        }
      }
      if (request.resource === 'courses') {
        if (headerLinks[i].classList.contains('courses')) {
          headerLinks[i].classList.add('active');
        } else {
          headerLinks[i].classList.remove('active');
        }
      }
      if (request.resource === 'contact') {
        if (headerLinks[i].classList.contains('contact')) {
          headerLinks[i].classList.add('active');
        } else {
          headerLinks[i].classList.remove('active');
        }
      }
    }

    burgerMenu.addEventListener('click', () => this.openNavMenu(burgerMenu))
  }

  openNavMenu(burgerMenu) {
    const navMenu = document.getElementsByClassName('header__nav')[0],
    contentContainer = document.getElementsByClassName('content-container')[0];

    burgerMenu.classList.toggle('open-menu');
    navMenu.classList.toggle('open-menu-list');
    contentContainer.classList.toggle('content-container-opacity');

    this.addTouchListener(burgerMenu, navMenu, contentContainer);
    this.addClickListener(burgerMenu, navMenu, contentContainer);
  }

  addTouchListener(burgerMenu, navMenu, contentContainer) {

    if (navMenu.classList.contains('open-menu-list')) {
      contentContainer.addEventListener('touchstart', () => this.removeActiveNav(burgerMenu, navMenu, contentContainer));
    } else {
      try {
        contentContainer.removeEventListener('touchstart', this.removeActiveNav);
      }
      catch(e) {
        return
      }
    }
  }

  addClickListener(burgerMenu, navMenu, contentContainer){
    if (navMenu.classList.contains('open-menu-list')) {
      contentContainer.addEventListener('click', () => this.removeActiveNav(burgerMenu, navMenu, contentContainer));
    } else {
      try {
        contentContainer.removeEventListener('click', this.removeActiveNav);
      }
      catch(e) {
        return
      }
    }
  }


  removeActiveNav(burgerMenu, navMenu, contentContainer) {
    burgerMenu.classList.remove('open-menu');
    navMenu.classList.remove('open-menu-list');
    contentContainer.classList.remove('content-container-opacity');
  }


}

export default Header;
