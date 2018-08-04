import React from "react";
import io from "socket.io-client";
//import io from "../../../server/app.js";

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentMessage: '',
      user: props.user,
      isOwner: props.isOwner,
      sprint_id: props.sprint_id
    };
    
    this.socket = io();
    
    this.socket.on('messages', allMessages => {
      this.setState({
        messages: allMessages
      })
      console.log('messages received');
    })
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.emitSprintId = this.emitSprintId.bind(this);

  }
  
  componentDidMount() {
    this.emitSprintId();
  }
            
  emitSprintId() {
    this.socket.emit('sprint_id', this.state.sprint_id);
  }

  handleChange(event) {
    this.setState({ currentMessage: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.currentMessage !== '') {
      this.socket.emit('message', this.state.currentMessage);
      this.setState({
        currentMessage: ''
      })
    }
  }

  render() {
    
    return (
      <div className="chatWindow"
        style={{
          padding: "1.5em"
        }}
      >
        CHAT WINDOW
        <div>
          {this.state.messages.map((message, index) => {
            return (<div key={index}>{message}</div>)
          }
          )}
        </div>
        <form onSubmit={this.handleSubmit} >
          <input type="text" value={this.state.currentMessage} onChange={this.handleChange} />
          <input type="submit" value="" />
        </form>
      </div>
    );
  }
}

export default ChatWindow;
