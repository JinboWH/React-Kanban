import React, {	Component,	PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Card from './Card'

class List extends React.Component {
	render() {
		let cards = this.props.cards.map((card) => {
			return <Card key = {card.id}  
			id={card.id} 
			title={card.title}
			description={card.description}
			tasks={card.taskItems}
			taskCallbacks={this.props.taskCallbacks} />
		});

		return (
			<div className="list"> 
			<h1>{this.props.title}</h1>
			{cards}
			</div>
		);
	}
}


List.propTypes = {
	title: PropTypes.string.isRequired,
	cards: PropTypes.arrayOf(PropTypes.object),
	taskCallbacks: PropTypes.object,
};


export default List;