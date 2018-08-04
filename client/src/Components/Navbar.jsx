import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import api from '../api';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      accountEl: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAcctClick = this.handleAcctClick.bind(this);
    this.handleAcctClose = this.handleAcctClose.bind(this);
    this.redirectToProfile = this.redirectToProfile.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  handleAcctClick(event) {
    this.setState({accountEl: event.currentTarget});
  }

  handleAcctClose() {
    this.setState({accountEl: null});
  }

  handleGraphiQL() {
  }

  redirectToProfile() {
    // REDIRECT TO PROFILE
  }

  render() {
    const { user, logout, sprintList } = this.props;
    const { anchorEl, accountEl } = this.state;
    return (
      <AppBar style={{ backgroundColor: '#ed1a5c' }}>
        <Toolbar>
          <Typography
            variant="title"
            color="inherit"
            style={{
              marginLeft: 50,
              marginRight: 50,
              fontSize: '1.75em'
            }}
            component={Link}
            to="/"
          >
            Scrumpty.
          </Typography>
          {user === null ? (
            <div>
              <Button
                color="inherit"
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                component={Link}
                label="login"
                to="/login"
              >
                Log In
              </Button>
              <Button
                color="inherit"
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                component={Link}
                label="register"
                to="/register"
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div>
              <Button
                color="inherit"
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                label="sprints"
              >
                My Sprints 
                <i className="fa fa-chevron-circle-down" style={{marginLeft: '8px'}} aria-hidden="true"></i>

              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                {sprintList && sprintList.map(sprint => (
                  <MenuItem
                    key={sprint.id}
                    onClick={this.handleClose}
                    value={sprint.id}
                    component={Link}
                    label={sprint.title}
                    to={`/sprint/${sprint.id}`}
                  >
                    {sprint.title}
                  </MenuItem>
                ))}
              </Menu>
              <Button
                color="inherit"
                aria-owns={accountEl ? 'simple-menu' : null}
                aria-haspopup="true"
                // onClick={this.handleAcctClick}
                onClick={this.redirectToProfile}
                label="account"
              >
                My Account
                <i className="fa fa-user-circle" style={{marginLeft: '8px'}} aria-hidden="true"></i>
              </Button>
              {/* <Menu
                id="simple-menu"
                anchorEl={accountEl}
                open={Boolean(accountEl)}
                onClose={this.handleAcctClose}
              >
                  <MenuItem
                    onClick={this.handleAcctClose}
                    value={'Change Password'}
                    component={Link}
                    label='Change Password'
                    to={`/updateuser`}
                  >
                  Change Password

                  </MenuItem>
              </Menu> */}
              <Button
                color="inherit"
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                href="/graphql"
                label="graphql"
              >
                GraphQL
              </Button>
              <Button
                color="inherit"
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                component={Link}
                to={"/logout"}
                label="logout"
              >
                Log Out
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
