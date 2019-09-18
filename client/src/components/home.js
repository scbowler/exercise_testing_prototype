import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExerciseList } from '../actions';

class Home extends Component {
    componentDidMount(){
        console.log('Component Mounted');
        this.props.getExerciseList();
    }

    render() {
        return (
            <div className="mt-5">
                <h1 className="text-center">Exercise Tester</h1>
            </div>
        );
    }
}

export default connect(null, { getExerciseList })(Home);
