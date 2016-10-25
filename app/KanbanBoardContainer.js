import React, {	Component} from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
import 'babel-polyfill'


//const url = 'http://10.32.34.3:8080/MarolandService/GL/GetTaskList';
const url = 'http://10.32.38.107:8080/MarolandService/React/';
const GetTaskList = 'GetTaskList';
const UpdateTaskItem = 'UpdateTaskItem';
const DeleteTaskItem = 'DeleteTaskItem';

const API_HEADERS = {'Content-Type': 'application/json'};

class KanbanBoardContainer extends Component{

	constructor(){
		super();
		this.state = {cards : []};
	}

	componentDidMount(){
		fetch(url + GetTaskList)
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({cards: responseData});
		})
		.catch((error) => {
			console.log('Error fetching and parsing data', error);
		});
	}

	addTask(cardId,taskName){
		let prevState = this.state;
		// Find the index of the card
		let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
		let newTask = {id:0,name:taskName, done:false};
		
		let nextState = update(this.state.cards, {
			[cardIndex]: {
			tasks: {$push: [newTask] }
			}
			});

		this.setState({cards:nextState});
	}

	deleteTask(cardId,taskId,taskIndex){

		let prevState = this.state;
		// Find the index of the card
		let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);


		console.log(cardIndex + ' ' + taskId + ' ' + taskIndex);

		// Create a new object without the task
		let nextState = update(this.state.cards, {
			[cardIndex]: {
				taskItems: {$splice: [[taskIndex,1]] }
			}
		});
		// set the component state to the mutated object
		console.log(nextState);
		this.setState({cards:nextState});

		var location = url + DeleteTaskItem + '/' + taskId;

		fetch(location, {
			method: "DELETE",
			headers: { "Content-Type": "application/x-www-form-urlencoded" }
		})
		.catch(error => {
			console.error("Fetch error:",error);
			this.setState(prevState);
		})
	}

	toggleTask(cardId,taskId,taskIndex){

		let prevState = this.state;

		let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
		let newDoneValue = this.state.cards[cardIndex].taskItems[taskIndex].done == 0 ? 1 : 0;

		let nextState = update(this.state.cards, {
			[cardIndex]: {
				taskItems: {
					[taskIndex]: {
						done: {$apply: done => {return newDoneValue;}}
					}
				}
			}
		});

		this.setState({cards:nextState});
		var location = url + UpdateTaskItem;

		fetch(location, {
			method: "POST",headers: { "Content-Type": "application/json" },
			body: JSON.stringify(nextState[cardIndex].taskItems[taskIndex])
		})
		//.then(response => {if (!response.OK) throw new Error("Server response wasn't OK")})
		.catch(error => {
			console.error("Fetch error:",error);
			this.setState(prevState);
		})

		/*
		$.ajax({
		url:test,
		type: 'POST',
		contentType: "application/json",
		data: JSON.stringify(nextState[cardIndex].taskItems[taskIndex]),
		});
*/
	}

	render() {
		return (<KanbanBoard cards={this.state.cards}  
			taskCallbacks={{
				toggle: this.toggleTask.bind(this),
				delete: this.deleteTask.bind(this),
				add: this.addTask.bind(this) }} />);
	}
}

export default KanbanBoardContainer