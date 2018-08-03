import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AddTaskForm from './AddTaskForm.jsx';


class AddTaskButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { shadow: 1, editing: false };
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.closeTask = this.closeTask.bind(this);
  }

  closeTask() {
    this.setState({ editing: false });
  }

  onMouseOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ shadow: 3 });
  }

  onMouseOut(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ shadow: 1 });
  }

  handleClick(e) {
    if (!this.state.editing) {
      this.setState({ editing: true });
    }
  }


  render() {
    const { task } = this.props;


    const style = {
      borderRadius: '10px',
      margin: '10px',

    };
    if (this.state.shadow === 3) {
      style.boxShadow = '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)';
    }

    if (this.state.editing) {
      return (
        <div>
          <Card onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={this.handleClick} style={style}>
            <AddTaskForm sprint_id={this.props.sprint_id} closeTask={this.closeTask} reload={this.props.reload} />
            <Button onClick={this.closeTask}>
              Cancel
            </Button>
          </Card>
        </div>
      );
    }

    return (
      <div>
        <Card onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={this.handleClick} style={style}>
          <Button variant="fab" aria-label="Add" style={{borderRadius: '0'}}>
            <AddIcon />
          </Button>
        </Card>
      </div>
    );
  }
}

export default AddTaskButton;
