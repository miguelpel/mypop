import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../redux/map';
import { BASE_URL } from '../constants/api';
import Select from 'react-select';
import ClientCard from './ClientCard';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as ROUTES from '../constants/routes';
import { init } from 'events';

const initialState = () => {
	return {
		options: [],
		currentStatus: undefined,
		responses: [],
		offsetOrderId: undefined,
		error: undefined,
		sort: "desc"
	};
};

class Page extends Component {
	constructor(props) {
		super(props);
		this.state = initialState()
	}

	componentDidMount() {
		this.getStatuses()
	}

	getStatuses() {
		const URL = `${BASE_URL}/orders/statuses`;
		let self = this
		fetch(URL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				const options = data.data.map((option) => {
					return {value : option, label: option}
				});
				self.setState ({ options })
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	handleChange = (selectedOption) => {
		this.setState({
			currentStatus: selectedOption,
			offsetOrderId: undefined
		}, () => this.queryDb())
		
	}

	queryDb() {
		const { offsetOrderId, currentStatus, sort } = this.state
		const { sessionToken } = this.props.userData;
		const limit = 3;
		const scanIndexForward = sort === "desc"
		? 0
		: 1
		
		const URL = offsetOrderId
		? `${BASE_URL}/orders?orderStatus=${currentStatus.value}&limit=${limit}&offsetOrderId=${offsetOrderId}&scanIndexForward=${scanIndexForward}`
		: `${BASE_URL}/orders?orderStatus=${currentStatus.value}&limit=${limit}&scanIndexForward=${scanIndexForward}`;

		let self = this

		fetch(URL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				sessionToken: sessionToken
			}
		})
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				const results = data.data
				const offsetOrderId = results.length >= 3 ? results[limit - 1].orderId : undefined
				self.setState({ results, offsetOrderId })		
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	getNextCards(event) {
		this.queryDb()
	}

	changeOrder(event) {
		const { sort } = this.state;
		const newSortOrder = sort === "desc" ? "asc" : "desc";
		this.setState({
			sort: newSortOrder,
			offsetOrderId: undefined
		}, () => this.queryDb())
	}

	render() {
		const { userData } = this.props;
		const { options, currentStatus, results, offsetOrderId, sort } = this.state; 
		return (
			<div className="centered">
				{userData ? (
					<div className="container">
						<SignOutButton />
						<Select
                    	value={currentStatus}
                    	onChange={this.handleChange}
						options={options}
						isSearchable={true}
						placeholder="Select option or type search..."
						className="leftAligned"
						/>
						<div>
						{results && results.map(dataSet => <ClientCard key={dataSet.orderId} dataSet={dataSet}/>)
}
						</div>
						<br/>
							{offsetOrderId && <button onClick={event => this.getNextCards(event)}>Next Results</button>}
							{results && <button onClick={event => this.changeOrder(event)}>Change results sort by payment time: {sort === "desc" ? "asc" : "desc"}</button>}
					</div>

				) : (
					<div className="centered">
						<h2>Welcome!</h2> 
						<div>Please <Link to={ROUTES.SIGN_IN}>Sign In</Link></div>
					</div>
				)}
			</div>
		);
	}
}

export default connect(mapStateToProps)(Page);
