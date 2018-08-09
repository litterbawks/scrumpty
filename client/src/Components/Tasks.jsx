import React from 'react';
import Task from './Task.jsx';
import { itemTypes } from "../../../lib/shared";
import api from '../api.js';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';



const columnTarget = {
	// canDrop(props, monitor) {
	// 	const item = monitor.getItem();
	// 	// console.log(props);
	// 	// console.log(monitor);
	// 	return true //is acutally in progress or done or whatever?
	// },
	hover(props, monitor, component){
		const clientOffset = monitor.getClientOffset();
		const componentRect = findDOMNode(component).getBoundingClientRect();

		// const isJustOverThisOne = monitor.isOver();
		// console.log(monitor.isOver())

		const canDrop = monitor.canDrop()
		// console.log(component)

	},

	drop(props, monitor, component){
		if(monitor.didDrop()){
			return;
		}
		const item = monitor.getItem();
		// console.log('weeee')
		component.isOver = monitor.isOver()
		// console.log(monitor.isOver())
		console.log(component.props.loc)

		item.task.status_code = component.props.loc
		api.updateTask(item.task).then(()=> { props.reload();})

		return item
	}
}

function collect(connect, monitor) {
	// console.log(connect.dropTarget())
	return {
		connectDropTarget : connect.dropTarget(),
		isOver: monitor.isOver({shallow : true}),
		isOverCurrent: monitor.canDrop(),
		itemType : monitor.getItemType()

	}
}


class Tasks extends React.Component {
  render() {
    const tasks = this.props.tasks;

    const { connectDropTarget } = this.props;

    const taskIndicatorStyle = {
      textAlign: "center",
      display: "block",
      fontSize: '1.4em',
      fontWeight: 'lighter'
    };
    // if (tasks.length === 0) { return (<div />); }

    return connectDropTarget(
      <div>
      <strong style={taskIndicatorStyle}>{this.props.title}</strong>
        {tasks.map(task => <Task sprint_id={this.props.sprint_id} reload={this.props.reload} key={`task:${task.id}`} task={task} />)}
      </div>
    );
  }
}

export default DropTarget(itemTypes.TASK, columnTarget, collect  )(Tasks);
