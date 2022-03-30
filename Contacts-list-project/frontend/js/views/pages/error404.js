import Component from '../../views/component';


class Error404 extends Component {
    render() {
        return new Promise(resolve => {
            resolve('<div class="error404">404<p>Not Found</p></div>');
        });
    }
}

export default Error404;
