import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const api = require('../api');

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', errormessage: '', firstname: '' };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUser = props.updateUser;
    this.history = props.history;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password, firstname } = this.state;
    api.addUser(username, password, firstname).then((res) => {
      console.log('elyse',res);
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
            <TextField required id="firstname" label="Firstname" value={this.state.firstname} margin="normal" onChange={this.handleFirstNameChange} />
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


      </div>
    );
  }
}

export default Register;
