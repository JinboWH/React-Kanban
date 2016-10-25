import React from 'react';
import ReactDOM from 'react-dom';
import KanbanBoard from './KanbanBoard';
import KanbanBoardContainer from './KanbanBoardContainer'

class App extends React.Component {
	render() {
		return (
			<KanbanBoardContainer />
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));