import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const api = require('../api');

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', errormessage: '', firstname: '', lastname: '', preferred: '', email: '', phonenumber: '' };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handlePreferredChange = this.handlePreferredChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUser = props.updateUser;
    this.history = props.history;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password, firstname, lastname, preferred, email, phonenumber } = this.state;
    api.addUser(username, password, firstname, lastname, preferred, email, phonenumber).then((res) => {
      if (!res) {
        this.setState({ errormessage: 'User Already Exists' });
        setTimeout(() => {
          this.setState({ errormessage: '' });
        }, 2000);
        return;
      }

      this.updateUser();
      this.history.push('/');
    });
  }


  handleUsernameChange(e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    e.preventDefault();
    this.setState({ password: e.target.value });
  }

  handleFirstNameChange(e) {
    e.preventDefault();
    this.setState({ firstname: e.target.value });
  }

  handleLastNameChange(e) {
    e.preventDefault();
    this.setState({ lastname: e.target.value });
  }

  handlePreferredChange(e) {
    e.preventDefault();
    this.setState({ preferred: e.target.value });
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({ email: e.target.value });
  }

  handlePhoneNumberChange(e) {
    e.preventDefault();
    this.setState({ phonenumber: e.target.value });
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit}>

          <div>
            <TextField required id="username" label="Username" value={this.state.username} margin="normal" onChange={this.handleUsernameChange} />
          </div>
          <div>
            <TextField required type="password" id="password" label="Password" value={this.state.password} margin="normal" onChange={this.handlePasswordChange} />
          </div>
          <div>
            <TextField required id="firstname" label="First Name" value={this.state.firstname} margin="normal" onChange={this.handleFirstNameChange} />
          </div>
          <div>
            <TextField required id="lastname" label="Last Name" value={this.state.lastname} margin="normal" onChange={this.handleLastNameChange} />
          </div>
          <div>
            <TextField required id="preferred" label="Preferred Name" value={this.state.preferred} margin="normal" onChange={this.handlePreferredChange} />
          </div>
          <div>
            <TextField required id="email" label="Email" value={this.state.email} margin="normal" onChange={this.handleEmailChange} />
          </div>
          <div>
            <TextField required id="phonenumber" label="Phone Number" value={this.state.phonenumber} margin="normal" onChange={this.handlePhoneNumberChange} />
          </div>
          <div id="registerformmessage" style={{ height: '20px' }}>
            {this.state.errormessage}
            {' '}
          </div>
          <div>
            <Button type="submit">
Register
            </Button>
          </div>
        </form>
        <div margin="normal">
        <a href="http://localhost:1337/users/auth/github/">Login With GitHub</a>
        </div>

      </div>
    );
  }
}

export default Register;
