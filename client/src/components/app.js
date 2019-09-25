import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import ExerciseEdit from './exercise_edit';
import ExerciseNew from './exercise_new';
import Exercise from './exercise';
import Home from './home';
import Editor from './editor';
import '../assets/css/app.scss';

const App = () => (
    <div className="app">
        <div className="container">
            <div className="text-right mt-3"><Link to="/"><i className="material-icons medium">home</i></Link></div>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/exercise/new" exact component={ExerciseNew} />
                <Route path="/exercise/edit/:id" exact component={ExerciseEdit} />
                <Route path="/exercise/:id" exact component={Exercise} />
                <Route path="/editor" render={props => <Editor/>} />
            </Switch>
        </div>
    </div>
);

export default App;
