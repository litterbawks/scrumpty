import React from "react";
import openSocket from "socket.io-client";
const socket = openSocket('http://localhost:1338');
//import io from "../../../server/app.js";

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentMessage: ''

    };
    
    const { user, isOwner, sprint_id } = props;
    
    // function to listen to sockets
    // chatSocket((err, message => {
      
    // subscribeToTimer((err, timeStamp) => this.setState({
      //   timestamp
      // }));
    
    socket.on('newMessage', message => {
      const messageArray = this.state.messages;
      messageArray.push(message);
      this.setState({
        messages: messageArray
      })
      console.log('new message added');
      console.log(this.state.messages);
    })
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

      // componentWillUpdate(nextProps) {
        // componentWillMount() {
          

          // onSubmit(e) {
            //   e.preventDefault();
            
            
            // }

  // newMessage((err, message) => {
  //   socket.on('newMessage', message)

  //   const messageArray = this.state.messages;
  //   messageArray.push(message);
  //   this.setState({
  //     messages: messageArray
  //   })
  // });
            
  handleChange(event) {
    this.setState({ currentMessage: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.message !== '') {
      socket.emit('message', this.state.currentMessage);
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
          {this.state.messages.map((message, index) => 
            <div key={index}>{message}</div>
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
