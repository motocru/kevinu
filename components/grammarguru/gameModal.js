import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class gameModal extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        guess: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.guess);
        this.setState({guess: ''});
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    render() {
        return(
            <div>
                <Modal 
                    isOpen={this.props.modal} 
                    toggle={this.props.toggle} 
                    size="lg"
                >
                    <ModalHeader>Guesses Remaining: {this.props.game.remaining}</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
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
                        </form>
                        <div className="view">
                            <div className="form-inline">
                                {/*TODO: figure out the color and spacing shite*/ }
                                <h4 style={{}}>{this.props.game.view}</h4>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.props.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default gameModal;