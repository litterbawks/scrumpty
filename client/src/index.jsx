import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BrowserRouter from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Login from "./Components/Login.jsx";
import Logout from "./Components/Logout.jsx";
import Register from "./Components/Register.jsx";
import Sprint from "./Components/Sprint.jsx";
import Home from "./Components/Home.jsx";
import AddSprint from "./Components/AddSprint.jsx";
import api from "./api";
import UpdateUserForm from "./Components/UpdateUserForm.jsx";
import { DragSource } from 'react-dnd';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      sprintList: [],
      sprint_id: false
    };
    this.updateUser = this.updateUser.bind(this);
    this.updateSprintList = this.updateSprintList.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // Any time app re-renders, check for user session
    this.updateUser();
  }

  updateSprintList() {
    // Fetch sprints for user
    return api.getSprints().then(sprintList => {
      this.setState({ sprintList });
    });
  }

  logout() {
    // Destroy user session
    api.logout().then(res => {
      if (res) {
        this.setState({ user: null, sprintList: [] });
      }
    });
  }

  updateUser() {
    // Check for user credentials, then fetch sprints for user
    api.verify().then(user => {
      if (user) {
        this.setState({ user });
        this.updateSprintList();
      }
    });
  }

  render() {
    return (
      <Router>
        <div style={{ fontFamily: "Roboto" }}>
          <Navbar
            user={this.state.user}
            logout={this.logout}
            sprintList={this.state.sprintList}
          />
          <hr style={{ marginBottom: "3.5em" }} />
          <Route
            exact
            path="/"
            render={() => <Home user={this.state.user} />}
          />
          <Route
            path="/login"
            render={({ history }) => (
              <Login history={history} updateUser={this.updateUser} />
            )}
          />
          <Route
            path="/logout"
            render={({ history }) => (
              <Logout history={history} logout={this.logout} />
            )}
          />
          <Route
            path="/updateuser"
            render={({ history }) => (
              <UpdateUserForm history={history} user={this.state.user} />
            )}
          />
          <Route
            path="/register"
            render={({ history }) => (
              <Register history={history} updateUser={this.updateUser} />
            )}
          />
          <Route
            path="/addsprint"
            render={({ history }) => (
              <AddSprint
                history={history}
                updateSprintList={this.updateSprintList}
              />
            )}
          />
          <Route
            path="/sprint/:id"
            render={routeprops => (
              <Sprint user={this.state.user} {...routeprops} />
            )}
          />
        </div>
      </Router>
    );
  }
}
render(<App />, document.getElementById("app"));
