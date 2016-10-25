import React, {	Component,	PropTypes} from 'react';
import ReactDOM from 'react-dom';
import CheckList from './CheckList'

class Card extends React.Component {

	constructor() {
		super();
		this.state = {
			showDetails: false
		};
	}

	toggleDetails() {
		this.setState({
			showDetails: !this.state.showDetails
		});
	}

	render() {
		let cardDetails;
		if (this.state.showDetails) {
			cardDetails = (
				<div className="card__details">
				{this.props.description}
				<CheckList cardId={this.props.id} tasks={this.props.tasks} 
				taskCallbacks={this.props.taskCallbacks} />
				</div>
				);
		};

		return (
			<div className="card" >
			<div className={this.state.showDetails? "card__title card__title--is-open" : "card__title"} onClick={this.toggleDetails.bind(this)}>
			{this.props.title}
			</div> 
			{cardDetails} 
			< /div>
			);
	}
}

Card.propTypes = {
	id: PropTypes.number,
	description: PropTypes.string,
	tasks: PropTypes.array,
	taskCallbacks: PropTypes.object
};

export default Card;