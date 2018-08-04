import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import { StatusCode } from "../../../lib/shared";
import Tasks from "./Tasks.jsx";
import api from "../api";
import AddTaskButton from "./AddTaskButton.jsx";
import AddUserToSprintForm from "./AddUserToSprintForm.jsx";
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import ChatWindow from "./ChatWindow.jsx";

class Sprint extends React.Component {
  constructor(props) {
    super(props);
    const sprint_id = +props.match.params.id || null;
    this.state = {
      sprint_id,
      isOwner: false,
      open: false,
      tasks: []
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.reload = this.reload.bind(this);
  }

  componentWillMount() {
    this.reload();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.match.params.id !== this.state.sprint_id) {
      this.setState({ sprint_id: nextProps.match.params.id }, () =>
        this.reload()
      );
    }
  }

  handleClickOpen(e) {
    e.preventDefault();
    this.setState({
      open: true
    });
  }

  reload() {
    // console.log(this.state,'state of sprint')
    api.getTasks(this.state.sprint_id).then(tasks => {
      this.setState({ tasks });
    });

    api.isOwner(this.state.sprint_id).then(res => {
      if (!res) {
        this.setState({ isOwner: false });
      } else {
        this.setState({ isOwner: true });
      }
    });
  }

  handleClose(shouldReload = false) {
    this.setState({
      open: false
    });
    if (shouldReload) {
      this.reload();
    }
  }

  render() {
    const tasks = this.state.tasks;
    const notStarted = tasks.filter(
      x => x.status_code === StatusCode.NotStarted
    );
    const inProgress = tasks.filter(
      x => x.status_code === StatusCode.InProgress
    );
    const complete = tasks.filter(x => x.status_code === StatusCode.Complete);

    const addButtonStyle = {
      margin: "auto",
      backgroundColor: "white"
    };

    const taskIndicatorStyle = {
      textAlign: "center",
      display: "block",
      fontSize: '1.4em',
      fontWeight: 'lighter'
    };

    return (
      <div onClick={this.closeEdits}>
        <Drawer variant="permanent" anchor="right">
          <AddUserToSprintForm
            user={this.props.user}
            isOwner={this.state.isOwner}
            sprint_id={this.state.sprint_id}
            style={{
              border: '1px solid black'
            }}
            />
          <ChatWindow
            
            reload={this.reload}
            user={this.props.user}
            isOwner={this.state.isOwner}
            sprint_id={this.state.sprint_id}
          />

        </Drawer>
        <Paper style={{ marginRight: "20em", marginLeft: "1em" }}>
          <Grid
            style={{ padding: "1em" }}
            container
            spacing={24}
            justify="center"
          >
            <Grid item xs={4}>
              <Tasks
                title={"Todo"}
                sprint_id={this.state.sprint_id}
                reload={this.reload}
                tasks={notStarted}
                loc = {0}
              />
              <Grid container style={{ textAlign: "center" }}>
                <AddTaskButton
                  sprint_id={this.state.sprint_id}
                  reload={this.reload}
                />
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Tasks
                title = {"In Progress"}
                sprint_id={this.state.sprint_id}
                reload={this.reload}
                tasks={inProgress}
                loc = {1}
              />
            </Grid>
            <Grid item xs={4}>
              <Tasks
                title={"Completed"}
                sprint_id={this.state.sprint_id}
                reload={this.reload}
                tasks={complete}
                loc = {2}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Sprint);

