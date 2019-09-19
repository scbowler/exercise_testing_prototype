import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adminGetExercise } from '../actions';
import AdminQuestion from './admin_question';

class ExerciseEdit extends Component {
    componentDidMount(){
        const { adminGetExercise, match: { params }} = this.props;

        adminGetExercise(params.id);
    }

    renderQuestions = () => {
        const { questions } = this.props;

        console.log('Questions:', questions);

        if(!questions){
            return <p>Loading questions...</p>
        }

        if(!questions.length){
            return <p>This exercise has no questions. Add one <i className="material-icons">arrow_forward</i></p>
        }

        return (
            <ol>
                {
                    questions.map(q => (
                        <li key={q.pid}><AdminQuestion {...q}/></li>
                    ))
                }
            </ol>
        )
    }

    render(){
        const { title } = this.props;

        return (
            <div>
                <h1 className="text-center">Edit {title && `"${title}"`} Exercise</h1>
                <div className="row mt-4">
                    <div className="col-6">
                        <h2>Questions</h2>
                        <this.renderQuestions/>
                    </div>
                    <div className="col-6">
                        <h2>Add Question</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({adminExercise}) => ({...adminExercise}), { adminGetExercise })(ExerciseEdit);
