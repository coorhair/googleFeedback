import React from 'react';
import ReactDOM from 'react-dom';
import FeedbackComponent from './feedback';

class Feedback {
    constructor(option) {
        this.container = option.container;
        this.trigger = option.trigger;
        this.send = option.send;
        this.theme = option.theme || null;
        this.license = option.license || '';
        if(!this.container) {
            console.error('missing container element');
            return;
        }
        this.init();
    }

    init() {
        ReactDOM.render(<Page
            trigger={this.trigger}
            send={this.send}
            theme={this.theme}
            license={this.license}
        />, this.container);
    }
}

window.Feedback = Feedback;

class Page extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
        }
    }

    componentDidMount() {
        if(this.props.trigger) {
            this.props.trigger.addEventListener('click', () => {
                this.setState({
                    open: true,
                })
            })
        }
    }

    cancel() {
        this.setState({
            open: false,
        })
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.open?
                        <FeedbackComponent
                            theme={this.props.theme}
                            cancel={this.cancel.bind(this)}
                            send={this.props.send}
                            license={this.props.license}
                        />:null
                }
            </React.Fragment>
        )
    }
}