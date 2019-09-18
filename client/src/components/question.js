import React, { Component } from 'react';

class Question extends Component {
    state = {
        answer: ''
    }

    render(){
        const { number, question, pid } = this.props;
        console.log('PID:', pid);

        return (
            <div>
                <p><span>{number}.</span> {question}</p>
                <textarea cols="50" rows="4" value={this.state.answer} onChange={({target: {value}}) => this.setState({answer: value})}></textarea>
            </div>
        );
    }
}

export default Question;
