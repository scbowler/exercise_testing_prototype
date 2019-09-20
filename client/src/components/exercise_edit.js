import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adminGetExercise } from '../actions';
import AdminQuestion from './admin_question';

class ExerciseEdit extends Component {
    state = {
        question: '',
        answer: '',
        test: ''
    }
    
    inputStyle = {
        width: '100%'
    }
    
    textStyle = {
        width: '100%'
    }

    componentDidMount(){
        const { adminGetExercise, match: { params }} = this.props;

        adminGetExercise(params.id);
    }

    handleInput = ({target: {name, value}}) => {
        this.setState({
            [name]: value
        });
    }

    renderQuestions = () => {
        const { questions } = this.props;

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

    clearForm = () => {
        this.setState({
            answer: '',
            question: '',
            test: ''
        });
    }

    submitQuestion = async e => {
        e.preventDefault();

        try {
            console.log('Values:', this.state);

            this.clearForm();
        } catch(err) {
            console.log('Error in component when adding new question:', err);
        }
    }

    render(){
        const { title } = this.props;
        const { answer, test, question } = this.state;

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
                        <form onSubmit={this.submitQuestion}>
                            <div>
                                <label htmlFor="question"><strong>Question:</strong></label>
                                <div>
                                    <input style={this.inputStyle} id="question" name="question" type="text" value={question} onChange={this.handleInput} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="answer"><strong>Answer:</strong></label>
                                <div>
                                    <textarea style={this.textStyle} id="answer" name="answer" rows="10" value={answer} onChange={this.handleInput} ></textarea>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="test"><strong>Test:</strong></label>
                                <div>
                                    <textarea style={this.textStyle} id="test" name="test" rows="10" value={test} onChange={this.handleInput} ></textarea>
                                </div>
                            </div>
                            <div className="text-right">
                                <button className="btn btn-outline-danger mr-3" onClick={this.clearForm} type="button">Clear Form</button>
                                <button className="btn btn-outline-primary">Add Question</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({adminExercise}) => ({...adminExercise}), { adminGetExercise })(ExerciseEdit);
