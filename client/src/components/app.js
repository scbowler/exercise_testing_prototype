import React from 'react';
import { Route } from 'react-router-dom';
import Exercise from './exercise';
import Home from './home';

const App = () => (
    <div className="app">
        <div className="container">

            <Route path="/" exact component={Home} />
            <Route path="/exercise/:id" component={Exercise} />
        </div>
    </div>
);

export default App;
