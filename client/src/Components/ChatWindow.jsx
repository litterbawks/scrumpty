import React from "react";
import io from "socket.io-client";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
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
    // this.reload = props.reload;
    // this.reload = this.reload.bind(this);
    
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
    console.log('chat window mounted');
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
    const message = {
      user: this.state.user.username,
      text: this.state.currentMessage
    }
    // const message = [this.state.user, this.state.currentMessage]
    if (this.state.currentMessage !== '') {
      this.socket.emit('message', message);
      this.setState({
        currentMessage: ''
      })
    }
  }

  render() {
    
    return (
      <div className="chatWindow"
        style={{
          padding: "1.5em",
          border: "1px solid #C0C0C0",
          borderRadius: "5px",
          width: "250px",
          height: "24em",
          float: "bottom"
        }}
      >
        <strong>Team Chat</strong>
        <div> </div>
        <div 
          style={{
            margin: '10px 0px 10px 0px',
            border: '1px solid #D3D3D3',
            borderRadius: '5px',
            height: '19em'
          }}
        >
          {this.state.messages.map((message, index) => {
            return (
              <div 
                key={index}
                style={{
                  margin: '2px 2px 2px 2px',
                  padding: '2px 2px 2px 2px',
                  border: '1px solid #ed1a5c',
                  borderRadius: '5px'
                }}
              >
                <a style={{ color: '#ed1a5c' }}>{message.user}: </a>
                <a>{message.text}</a>
              </div>
            )
          }
          )}
        </div>
        <form onSubmit={this.handleSubmit} >
          <TextField
            type="text" 
            value={this.state.currentMessage} 
            onChange={this.handleChange} 
            style={{
              width: '175px',
              margin: '0px 2px 0px 0px',
            }}
          />
          <Button type="submit" variant="outlined">
            Send
          </Button>
        </form>
      </div>
    );
  }
}

export default ChatWindow;
