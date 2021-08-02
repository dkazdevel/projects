import Component from '../../views/component';

import HeaderTemplate from '../../../templates/partials/header'

class Header extends Component {
    render() {
      const requestData = this.request;

      return new Promise(resolve => {
          resolve(HeaderTemplate({requestData}));
      });
  }
  
}

export default Header;
