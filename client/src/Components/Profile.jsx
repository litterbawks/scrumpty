import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';



class AddTaskButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { shadow: 1, editing: false };

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
