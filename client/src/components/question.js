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

    render(){
        const { question } = this.props;

        return (
            <li className="mt-4">
                <div className="row">
                    <div className="col-6">
                        <p>{question}</p>
                        <div className="ml-2">
                            <textarea cols="50" rows="4" value={this.state.answer} onChange={({ target: { value } }) => this.setState({ answer: value })}></textarea>
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
