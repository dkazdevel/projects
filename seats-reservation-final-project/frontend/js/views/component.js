import {parseRequestURL} from '../helpers/utils.js';

class Component {
    constructor() {
        this.request = parseRequestURL();
    }

    getData() {
      return new Promise(resolve => resolve());
	}

    getConcertSeatsData() {
      return new Promise(resolve => resolve());
    }

    afterRender() {}
}

export default Component;
