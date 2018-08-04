import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Blockers from './Blockers.jsx';
import { PRIORITY_COLOR, itemTypes } from '../../../lib/shared';
import EditTaskForm from './EditTaskForm.jsx';
import { DragSource } from 'react-dnd';
import api from '../api.js'
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

// // MOVED THE FOLLOWING TO THE RENDER PART OF TASK COMPONENT
// const TaskInfo = ({ task, reload }) => (
//   <div>
//     <CardContent style={{ padding: '5px', textAlign: 'center' }}>
//       <div sytle={{ position: 'fixed' }}>
//         {task.title}
//       </div>

//       {/* <Button size="small" position="absolute" right="0"> */}
//       <Button size="small"
//         style={{
//           position: 'relative', float: 'right', top: '-20px',  padding: '0', display: 'inline-block'
//         }}
//       >
//         <EditIcon />
//       </Button>
//       <div>
//         <Blockers reload={reload} blockers={task.blockers} />
//       </div>
//     </CardContent>
//   </div>
// );

const cardSource = {
  canDrag(props){
    return true
  },

  beginDrag(props, monitor, component){
    const item = { task : props.task };
    console.log(item)
    console.log(component)
    return item
  },

  isDragging(props, monitor){
    console.log('isDragging')
    console.log(props)
    console.log(monitor)
    return monitor.getItem().task.status_code === props.status_code

  },

  endDrag(props, monitor, component){
    const dropResult = monitor.getDropResult();
    console.log(dropResult)
  }

}

function collect(connect, monitor){
  return {
    connectDragSource : connect.dragSource(),
    isDragging : monitor.isDragging()
  }
}

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shadow: 1, editing: false };
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.closeTask = this.closeTask.bind(this);
  }

  closeTask() {
    this.setState({ editing: false });
  }

  onMouseOver(e) {
    this.setState({ shadow: 3 });
  }

  onMouseOut(e) {
    this.setState({ shadow: 1 });
  }

  handleDoubleClick(e) {
    this.setState({ editing: !this.state.editing }, () => this.props.reload());
  }

  handleClick(e) {
    this.setState({ editing: !this.state.editing }, () => this.props.reload());
  }

  render() {
    const { task } = this.props;
    const borderColor = PRIORITY_COLOR[task.priority_code];

    const { isDragging, connectDragSource } = this.props;
    const style = {
      borderRadius: '10px',
      margin: '10px',
      borderLeft: '2px solid',
      borderLeftColor: borderColor,

    };
    if (this.state.shadow === 3) {
      style.boxShadow = '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)';
    }

    if (this.state.editing) {
      return (
        <div>
          <Card onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onDoubleClick={this.handleDoubleClick} style={style}>
            <EditTaskForm sprint_id={this.props.sprint_id} reload={this.props.reload} closeTask={this.closeTask} task={this.props.task} />
          </Card>
        </div>
      );
    }

    return connectDragSource(
      <div>
        <Card
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          style={style}
        >
          <div>
            <CardContent style={{ padding: '5px', textAlign: 'center' }}>
              <div sytle={{ position: 'fixed' }}>
                {this.props.task.title}
              </div>
              <Button
                size="small"
                style={{
                  position: 'relative', float: 'right', top: '-20px',  padding: '0', display: 'inline-block'
                }}
                onClick={this.handleClick}
              >
                <EditIcon />
              </Button>
              <div>
                <Blockers reload={this.props.reload} blockers={this.props.task.blockers}/>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
}

export default DragSource(itemTypes.TASK, cardSource, collect)(Task);
