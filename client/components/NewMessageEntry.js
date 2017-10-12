import React, { Component } from 'react';
import store, { writeMessage , gotNewMessageFromServer, postMessages } from './store';
import socket from '../socket'


export default class NewMessageEntry extends Component {

  constructor(){
    super();
    this.state = store.getState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(()=>{
      this.setState(store.getState());
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  handleChange(event){
    const action = writeMessage(event.target.value)
    store.dispatch(action)
  }

  handleSubmit(event){
    event.preventDefault();
    const thunk = postMessages({ content: this.state.newMessageEntry, channelId: this.props.channelId, name: this.state.username});
    console.log('THUNK!!!!', thunk);
    store.dispatch(thunk);
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            onChange={this.handleChange}
            value={this.state.newMessageEntry}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
