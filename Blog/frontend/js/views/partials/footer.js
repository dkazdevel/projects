import Component from "../../views/component";

class Footer extends Component {
  render() {
    return new Promise((resolve) => {
      resolve(`
            <p>Blog 2022
            </p>
            `);
    });
  }
}

export default Footer;
