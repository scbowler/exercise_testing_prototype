import React from 'react';
import { Route } from 'react-router-dom';
import Home from './home';

const App = () => (
    <div className="app">
        <div className="container">

            <Route path="/" exact component={Home} />
        </div>
    </div>
);

export default App;
