import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adminAddQuestion, adminCheckTest, adminGetExercise } from '../actions';
import AdminQuestion from './admin_question';
import Editor from './editor';

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

    handleEditor(name, value){
        this.setState({
            [name]: value
        });
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
        const { adminAddQuestion, match: { params } } = this.props;

        try {
            await adminAddQuestion(params.id, { ...this.state });

            this.clearForm();
        } catch(err) {
            console.log('Error in component when adding new question:', err);
        }
    }

    testQuestion = async () => {
        const { adminCheckTest, match: { params } } = this.props;

        try {
            await adminCheckTest(params.id, { ...this.state });
        } catch (err) {
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
                                    <Editor
                                        height="162px"
                                        name="answer-editor"
                                        onChange={(v) => this.handleEditor('answer', v)}
                                        value={this.state.answer}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="test"><strong>Test:</strong></label>
                                <div>
                                    <Editor
                                        height="324px"
                                        name="test-editor"
                                        onChange={(v) => this.handleEditor('test', v)}
                                        value={this.state.test}
                                    />
                                </div>
                            </div>
                            <div className="text-right mt-4">
                                <button className="btn btn-outline-danger mr-3" onClick={this.clearForm} type="button">Clear Form</button>
                                <button className="btn btn-outline-info mr-3" onClick={this.testQuestion} type="button">Test Question</button>
                                <button className="btn btn-outline-primary">Test and Add Question</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({adminExercise}) => ({...adminExercise}), { adminAddQuestion, adminCheckTest, adminGetExercise })(ExerciseEdit);
