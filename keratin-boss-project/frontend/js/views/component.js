import {parseRequestURL} from '../helpers/utils.js';

class Component {
    constructor() {
        this.request = parseRequestURL();
    }

    afterRender() {}
}

export default Component;
