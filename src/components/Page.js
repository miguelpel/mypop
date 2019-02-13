import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../redux/map';
import { BASE_URL } from '../constants/api';
import Select from 'react-select';
import ClientCard from './ClientCard';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as ROUTES from '../constants/routes';

class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: [],
			currentStatus: undefined,
			responses: [],
			error: undefined
		};
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
        this.setState({ currentStatus: selectedOption });
		this.queryDb(selectedOption.value)
	}

	queryDb(orderStatus) {
		const URL = `${BASE_URL}/orders?orderStatus=${orderStatus}`;
		const { userData } = this.props;
		const sessionToken = userData.sessionToken;
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
				console.log(data)
				const results = data.data.map(dataSet => <ClientCard key={dataSet.orderId} dataSet={dataSet}/>)
				self.setState({ results })
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	render() {
		const { userData } = this.props;
		const { options, currentStatus, results } = this.state;
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
						{results && [...results]}
						</div>
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
