import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ExerciseNew extends Component {
    state = {
        title: ''
    }

    handleSubmit = e => {
        e.preventDefault();

        console.log('Title:', this.state.title);
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

export default ExerciseNew;
