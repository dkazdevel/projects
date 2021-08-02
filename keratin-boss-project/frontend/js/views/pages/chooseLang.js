import {parseRequestURL} from '../../helpers/utils.js'

import Component from '../../views/component.js';

class ChooseLang extends Component {
	constructor() {
		super();
	}

  render(concerts) {
	  return new Promise(resolve => {
	    resolve(`
				<div class="container-404">
				<header class="d-flex flex-wrap justify-content-center py-3 mb-4 header404">
					<a href="#/about" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none headerWidth404">
						<span class="fs-4">KeratinBoss</span>
					</a>
				</header>
				<div class="content-container__choose-lang-container">

 			 	<h2 class="content-container__choose-lang-container__h2">Please, choose your language:</h2>
 				<a href="#/${this.getResource()}/pl" class="content-container__choose-lang-container__a">Polish</a>
 				<a href="#/${this.getResource()}/ru" class="content-container__choose-lang-container__a last-a">Russian</a>
 			 </div>
				</div>

	    `);
	  });
  }

  afterRender(concertsData) {
    this.setActions(concertsData);
  }

  setActions(concertsData) {
	}

	getResource() {
		if (parseRequestURL().resource) {
			return parseRequestURL().resource;
		} else {
			return 'about';
		}
	}

}

export default ChooseLang;
