import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminCreateExercise } from '../actions';

class ExerciseNew extends Component {
    state = {
        title: ''
    }

    handleSubmit = async e => {
        e.preventDefault();

        try  {
            const id = await this.props.adminCreateExercise(this.state.title);

            this.props.history.push(`/exercise/edit/${id}`);
        } catch(err) {
            console.log('Error in component creating new exercise');
        }
    }

    render(){
        return (
            <div>
                <h1 className="text-center">Create New Exercise</h1>
                <form className="mt-5" onSubmit={this.handleSubmit}>
                    <div className="text-center">
                        <label htmlFor="title">Exercise Title</label>
                        <div>
                            <input style={{ width: '50%' }} id="title" type="text" onChange={({ target: { value } }) => this.setState({ title: value })}/>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <Link className="btn btn-outline-danger mr-4" to="/">Cancel</Link>
                        <button className="btn btn-outline-primary"  >Create Exercise</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(null, { adminCreateExercise })(ExerciseNew);
