import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExercise } from '../actions';
import Question from './question';

class Exercise extends Component {
    componentDidMount(){
        const { getExercise, match: { params } } = this.props;

        getExercise(params.id);
    }

    renderQuestions = () => {
        const { exercise } = this.props;

        if(!exercise){
            return <p><strong>Questions loading...</strong></p>;
        }

        const { questions } = exercise;

        if(!questions.length){
            return <p><strong>No questions available for this exercise</strong></p>
        }

        return questions.map((q, i) => <Question key={q.pid} number={i + 1} {...q} />);
    }

    render(){
        return (
            <div>
                <h1 className="text-center mt-5">{this.props.exercise?.title || 'Exercise'}</h1>
                <this.renderQuestions/>
            </div>
        );
    }
}

export default connect(({exercise: {current}}) => ({ exercise: current}), { getExercise })(Exercise);
