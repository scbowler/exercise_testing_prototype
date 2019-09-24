import React, { Component } from 'react';
import { connect } from 'react-redux';
import brace from 'brace';
import Ace from 'react-ace';
import { checkAnswer } from '../actions';
import 'brace/theme/tomorrow_night_bright';
import 'brace/snippets/javascript';
import 'brace/ext/language_tools';
import 'brace/mode/javascript';

class Question extends Component {
    state = {
        answer: '',
        theme: 'tomorrow_night_bright'
    }

    submitAnswer = () => {
        const { checkAnswer, pid } = this.props;
        const { answer } = this.state;

        checkAnswer(pid, answer);
    }

    setTheme = theme => this.setState({theme})

    themeBtns = () => {
        return themes.map(t => {
            return <button key={t} onClick={() => {this.setTheme(t)}}>{t}</button>;
        });
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
                            {/* <textarea cols="50" rows="4" value={this.state.answer} onChange={({ target: { value } }) => this.setState({ answer: value })}></textarea> */}
                            <Ace
                                mode="javascript"
                                theme={this.state.theme}
                                onChange={this.editorChange}
                                name={pid}
                                editorProps={{}}
                                height="162px"
                                width="100%"
                                value={this.state.answer}
                                enableBasicAutocompletion={true}
                                enableLiveAutocompletion={true}
                                readOnly={complete}
                                editorProps={{
                                    $blockScrolling: Infinity
                                }}
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
