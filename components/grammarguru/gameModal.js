import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
                <span style={{color: 'white', marginRight: '3px'}}><strong>Guess:</strong></span>
                <input type="text" 
                    className="guess" 
                    name="guess" 
                    maxLength="1"
                    value={this.state.guess}
                    onChange={this.onChange}
                    style={{
                        borderRadius: '4px',
                        padding: '7px 11px',
                        margin: '8px 0',
                        border: '1px solid #ccc',
                        boxSizing: 'border-box',
                        marginRight: '3px'
                    }}
                />
                <button type="submit"
                    style={{
                        backgroundColor: '#3333ff',
                        color: 'white',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        border: 'none',
                        padding: '8px'
                    }}
                >Send Guess</button>
            </form>);
        } else {
            guessInputField = (<div><h4>Status: {this.props.game.status}</h4></div>);
        }

        return(
            <div>
                <div className="modal-wrapper"
                    style={{
                        transform: this.props.show ? 'translateY(0vh)': 'translateY(-100vh)',
                        opacity: this.props.show ? '1': '0'
                    }}>
                    <div className="modal-header">
                        <h2>Guesses Remaining: {this.props.game.remaining}</h2>
                    </div>
                    <div className="modal-body">
                        {guessInputField}
                        <div className="form-inline" style={{textAlign: 'center'}}>
                            <h3 style={{color: 'white', marginRight: '3px'}}>Current view: </h3>{' '}
                            <h3 className="letters view">{this.props.game.view}</h3>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <h3 style={{marginTop: '3px'}}>Guesses: </h3>{' '}
                        <div style={{float: 'left', marginTop: '6px'}}>
                            {Array.from(this.props.game.guesses).map((guessLettter, key) => (
                                <h3 key={key} style={{display: 'inline'}} className="letters guess">{guessLettter}</h3>
                            ))}
                        </div>
                        <div>
                            <button className="close-modal-btn" onClick={this.props.toggle}>Cancel</button>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .letters {
                        letter-spacing: 8px;
                        text-transform: uppercase;
                        text-indent: 10px;
                        font-size: 25px;
                        background-color: ${this.props.game.colors.bodycolor};
                        font-family: "${this.props.game.font}";
                    }
                    .view {
                        color: ${this.props.game.colors.textcolor};     
                    }
                    .guess {
                        color: ${this.props.game.colors.guesscolor};
                    }

                    .modal-wrapper {
                        background: #383838;
                        border: 1px solid black;
                        border-radius: 4px;
                        margin: 100px auto 0;
                        overflow: auto;
                        transition: all .8s;
                        width: 80%;
                        font-size: 25px;
                    }
                    
                    .modal-header {
                        height: 70px;
                        line-height: 1.6;
                        padding: 5px 20px;
                    }
                    
                    .modal-header h2 {
                        color: white;
                        float: left;
                    }
                    
                    .modal-body {
                        color: white;
                        padding: 10px 15px;
                        text-align: left;
                        border-top: 1px solid black;
                        border-bottom: 1px solid black;
                        margin-left: 20px;
                        margin-right: 20px;
                    }

                    .form-inline {
                        display: flex;
                        flex-flow: row nowrap;
                        align-items: stretch;
                    }
                    
                    .modal-footer {
                        display: inline-grid;
                        grid-template-columns: 130px auto auto;
                        color: white;
                        min-height: 4rem;
                        max-height: 18rem;
                        width: 100%;
                        padding: 15px;
                    }
                    
                    .close-modal-btn {
                        background-color: #606060;
                        cursor: pointer;
                        padding: 10px;
                        border-radius: 4px;
                        border: none;
                        margin-top: 3px;
                        float: right;
                    }
                    
                    .close-modal-btn:hover {
                        background-color: black;
                        color: white;
                    }
                `}</style>
            </div>
        );
    }
}
export default gameModal;