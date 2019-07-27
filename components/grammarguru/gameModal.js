import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class gameModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <Modal 
                    isOpen={this.props.modal} 
                    toggle={this.props.toggle} 
                    className={this.props.className}
                    size="lg"
                >
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalBody>
                        <form>
                            <div className="form-group">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><strong>Guess:</strong></span>
                                    </div>
                                    <input type="text" className="form-control" name="guess" maxLength="1" />
                                    <button type="submit" className="btn btn-primary" onClick={() => this.props.onSubmit()}>Send Guess</button>
                                </div> 
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.toggle()}>Do Something</Button>
                        <Button color="secondary" onClick={() => this.props.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default gameModal;