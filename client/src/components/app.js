import React from 'react';
import { Route, Link } from 'react-router-dom';
import ExerciseEdit from './exercise_edit';
import Exercise from './exercise';
import Home from './home';
import '../assets/css/app.scss';

const App = () => (
    <div className="app">
        <div className="container">
            <div className="text-right mt-3"><Link to="/"><i className="material-icons medium">home</i></Link></div>
            <Route path="/" exact component={Home} />
            <Route path="/exercise/edit/:id" exact component={ExerciseEdit} />
            <Route path="/exercise/:id" exact component={Exercise} />
        </div>
    </div>
);

export default App;
