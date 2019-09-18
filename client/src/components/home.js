import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getExerciseList } from '../actions';

class Home extends Component {
    componentDidMount(){
        this.props.getExerciseList();
    }

    renderList = () => {
        const { list } = this.props;

        if(!list){
            return <p><strong>Loading exercise list...</strong></p>;
        }

        if(!list.length){
            return <p><strong>No available exercises</strong></p>;
        }

        return (
            <ol>
                {list.map(({ pid, title }) => (
                    <li key={pid}>
                        <Link to={`/exercise/${pid}`}>{title}</Link>
                    </li>
                ))}
            </ol>
        );
    }

    render() {

        return (
            <div className="mt-5">
                <h1 className="text-center">Exercise Tester</h1>
                <div className="mt-4">
                    <h2>Exercises:</h2>
                    <this.renderList/>
                </div>
            </div>
        );
    }
}

export default connect(({exercise: { list }}) => ({list}), { getExerciseList })(Home);
