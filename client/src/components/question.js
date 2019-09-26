import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkAnswer } from '../actions';
import Editor from './editor';

class Question extends Component {
    state = {
        answer: ''
    }

    submitAnswer = () => {
        const { checkAnswer, pid } = this.props;
        const { answer } = this.state;

        checkAnswer(pid, answer);
    }

    renderFailures = ({fails}) => {
        if(!fails){
            return <p className="text-danger">Unknown error ocurred</p>;
        }

        if(typeof fails === 'string'){
            return <p className="text-danger">{fails}</p>;
        }

        if(fails.length){
            return (
                <ol>
                    {
                        fails.map(f => {
                            return (
                                <li key={f.title}>{f.fullTitle}
                                    <ul>
                                        <li className="text-danger"><strong>ERROR:</strong> {f.err.message}</li>
                                    </ul>
                                </li>
                            )
                        })
                    }
                </ol>
            )
        }

        return null;
    }

    renderResults = () => {
        const { result } = this.props;

        if (!result) {
            return null;
        }

        const { passed } = result;
        const { error, report } = result.result;
        const { stats } = report || {};

        let statsMessage = null;

        if(stats){
            statsMessage = <p className={`text-${passed ? 'success' : 'danger'}`}>Passed {stats.passes}/{stats.tests} Tests</p>
        }

        if(passed){
            return (
                <div>
                    <h4 className="text-success">All Tests Passed</h4>
                    {statsMessage}                    
                </div>
            );
        }

        return (
            <div>
                <h4 className="text-danger">Failed Tests</h4>
                {statsMessage}

                <this.renderFailures fails={report?.failures || error}/>
            </div>
        );
    }

    editorChange = value => {
        this.setState({
            answer: value
        });
    }

    render(){
        const { pid, question, result } = this.props;
        const complete = result ? result.passed : false;

        return (
            <li className="mt-4">
                <div className="row">
                    <div className="col-6">
                        <p>{question}</p>
                        <div className="ml-2">
                            <Editor 
                                height="162px"
                                name={pid}
                                onChange={this.editorChange}
                                value={this.state.answer}
                                readOnly={complete}
                            />
                            <div className="mt-2">
                                <button onClick={this.submitAnswer} className="btn btn-outline-success">Check Answer</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <this.renderResults />
                    </div>
                </div>                    
            </li>
        );
    }
}

export default connect(null, {checkAnswer})(Question);
