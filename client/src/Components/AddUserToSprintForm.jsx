import React from "react";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import api from "../api";

class AddUserToSprintForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sprint_id: props.sprint_id,
      repo: '',
      username: "",
      users: [],
      status: 0 // display what when the menu is showing? 0 - not submitted, 1 - pending, 2 - success, 3 - failed
    };
    this.userChange = this.userChange.bind(this);
    // this.etaChange = this.etaChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.reload = this.reload.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser(user_id) {
    const sprint_id = this.state.sprint_id;

    this.setState({ status: 1 });
    api
      .removeUserFromSprint({ sprint_id, user_id })
      .then(res => {
        if (!res) {
          this.setState({ status: 3 });
          return;
        }
        this.setState({ status: 2 }, this.reload());
      })
      .catch(err => console.log("err"));
  }

  componentWillUpdate(nextProps) {
    console.log('next props', nextProps);
    if (nextProps.sprint_id !== this.state.sprint_id) {
      this.setState({ sprint_id: nextProps.sprint_id, users: []}, () =>
        this.reload()
      );
    }
  }

  findSprint(list) {
    // console.log('list', list);
    // console.log('sprint id', context.state.sprint_id);
    // console.log('repo', list[3].repo);
    console.log('this function is firing');
    console.log('sprint id inside function', this.state.sprint_id);
    for (let i = 0; i < list.length; i++) {
      console.log('list i id', list[i].id);
      if (list[i].id == this.state.sprint_id) {
        // console.log('context', context);
        console.log('repo', list[i].repo)
        this.setState({
          repo: list[i].repo
        })
      }
    }
  }

  componentWillMount() {
    this.reload();
  }
  
  reload() {
    api
    .getUsersInSprint(this.state.sprint_id)
    .then(users => {console.log('users', users); this.setState({ users })});
    
    this.findSprint(this.props.sprintList);
    
  }

  onSubmit(e) {
    e.preventDefault();

    // sprint id passed down via props
    this.setState({ status: 1 });

    api
      .addUserToSprint({
        username: this.state.username,
        sprint_id: this.props.sprint_id
      })
      .then(res => {
        if (!res) {
          this.setState({ status: 3 });
          return;
        }
        this.setState({ status: 2, username: "" }, this.reload());
      });
  }

  userChange(e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  render() {
    let interior = (
      <div>
        <TextField
          required
          id="user"
          label="Username"
          value={this.state.username}
          margin="normal"
          onChange={this.userChange}
        />
        <Button type="submit">Add Team Member</Button>
      </div>
    );

    if (this.state.status === 1) {
      interior = <div>Saving...</div>;
    }
    if (this.state.status === 2) {
      interior = <div>Success!</div>;
      setTimeout(() => {
        this.setState({ status: 0, title: "" });
      }, 1000);
    }
    if (this.state.status === 3) {
      interior = <div>Failed!</div>;
      setTimeout(() => {
        this.setState({ status: 0 });
      }, 1000);
    }
    return (
      <div
        style={{
          padding: "1.5em"
        }}
      >
        <div>
          <strong>GitHub Repo</strong>
          <br />
          <a href={this.state.repo}>{this.state.repo}</a>
        </div>
        <div>
          <strong>Team Members</strong>
        </div>
        <hr />
        <div>
          {this.state.users.map((user, i) => (
            <div key={i}>
              {`${user.username}  `}
              {this.props.isOwner &&
                user.id !== this.props.user.id && (
                  <button
                    style={{ float: "right" }}
                    onClick={() => this.deleteUser(user.id)}
                  >
                    X
                  </button>
                )}
              <hr />
            </div>
          ))}
        </div>
        {this.props.isOwner && (
          <form style={{ width: "150px" }} onSubmit={this.onSubmit}>
            {interior}
          </form>
        )}
      </div>
    );
  }
}

export default AddUserToSprintForm;
