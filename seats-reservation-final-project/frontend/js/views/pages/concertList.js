import Component from '../../views/component';

import Concerts from '../../models/concerts';
import ConcertListTemplate from '../../../templates/pages/concerts/concertList'


class ConcertList extends Component {
	constructor() {
		super();

		this.model = new Concerts();
	}

	getData() {
		return new Promise(resolve => this.model.getConcertList().then(concerts => resolve(concerts)));
	}

  render(data) {
		let concerts = data.shift();

		return new Promise(resolve => {
			resolve(ConcertListTemplate({concerts}));
		});
  }

}

export default ConcertList;
