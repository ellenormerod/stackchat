import React, { Component } from 'react';
import store, { newUsername } from './store';

export default class NameEntry extends Component {

    constructor() {
        super();
        this.state = store.getState();
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleChange(event) {
        const action = newUsername(event.target.value);
        store.dispatch(action);
    }

    render() {
        return (
            <form className='form-inline'>
                <label htmlFor='name'>Your name:</label>
                <input
                    type='text'
                    name='name'
                    placeholder='Enter your name'
                    className='form-control'
                    onChange={this.handleChange}
                />
            </form>
        );
    }
}
