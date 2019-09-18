import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkAnswer } from '../actions';

class Question extends Component {
    state = {
        answer: ''
    }

    submitAnswer = () => {
        const { checkAnswer, pid } = this.props;
        const { answer } = this.state;

        checkAnswer(pid, answer);
    }

    render(){
        const { number, question } = this.props;

        return (
            <div className="mt-4">
                <p><span>{number}.</span> {question}</p>
                <div className="ml-4">
                    <textarea cols="50" rows="4" value={this.state.answer} onChange={({ target: { value } }) => this.setState({ answer: value })}></textarea>
                    <div className="mt-2">
                        <button onClick={this.submitAnswer} className="btn btn-outline-success">Check Answer</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, {checkAnswer})(Question);
