import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill(); //do I even need this?

class gameModal extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        guess: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.props.game.guesses.includes(this.state.guess)) {
            alert('You have already guessed this letter');
        } else {
            this.props.guessLetter(this.state.guess);
        }
        this.setState({guess: ""});
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    render() {
        let guessInputField;

        if (this.props.game.remaining > 0 && this.props.game.status === "Unfinished") {
            guessInputField = (<form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><strong>Guess:</strong></span>
                        </div>
                        <input type="text" 
                        className="form-control" 
                        name="guess" 
                        maxLength="1"
                        value={this.state.guess}
                        onChange={this.onChange}
                        style={{flex: '10', padding: '5px'}}/>
                        <button type="submit" className="btn btn-primary">Send Guess</button>
                    </div> 
                </div>
            </form>);
        } else {
            guessInputField = (<div><h4>Status: {this.props.game.status}</h4></div>);
        }

        return(
            <div>
                <Modal 
                    isOpen={this.props.modal} 
                    toggle={this.props.toggle} 
                    size="lg"
                >
                    <ModalHeader>Guesses Remaining: {this.props.game.remaining}</ModalHeader>
                    <ModalBody>
                        {guessInputField}
                        <div>
                            <div className="form-inline">
                                {/*TODO: figure out the color and spacing shite*/ }
                                <h4>Current view: </h4>{' '}
                                <h4 className="letters view">{this.props.game.view}</h4>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <h4 className="mr-auto">Guesses: </h4>{' '}
                        <h4 className="letters guess mr-auto">{this.props.game.guesses}</h4>
                        <Button color="secondary" onClick={() => this.props.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <style jsx>{`
                    .letters {
                        letter-spacing: 8px;
                        padding: 10px;
                        text-transform: uppercase;
                        text-indent: 10px;
                        background-color: ${this.props.game.colors.bodycolor};
                        font-family: "${this.props.game.font}";
                    }
                    .view {
                        color: ${this.props.game.colors.textcolor};     
                    }
                    .guess {
                        color: ${this.props.game.colors.guesscolor};
                    }
                `}</style>
            </div>
        );
    }
}
export default gameModal;