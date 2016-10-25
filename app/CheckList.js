import React from 'react';
import ReactDOM from 'react-dom';

class CheckList extends React.Component {
	render() {
		/*
		let tasks = this.props.tasks.map((task) => (

			<li className="checklist__task" key = {task.id}>
			<input type="checkbox" defaultChecked={task.done} />
			{task.name}
			<a href="#" className="checklist__task--remove" />
			</li>
		));
		return (
			<div className="checklist">
			<ul>{tasks}</ul>
			</div>
		);
*/
let tasks = this.props.tasks.map((task, taskIndex) => (
	<li key={task.id} className="checklist__task">
	<input type="checkbox" checked={task.done} 
	onChange={this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)
	} />
	{task.name}{' '}
	<a href="#" className="checklist__task--remove" onClick={
		this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex)
	} />
	</li>
	));

return (
	<div className="checklist">
	<ul>{tasks}</ul>
	</div>
	);

}
}

export default CheckList;