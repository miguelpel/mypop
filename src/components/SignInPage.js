import React, { Component } from 'react';
import { store } from '../redux/store';
import { withRouter } from 'react-router-dom';

import { BASE_URL } from '../constants/api';

import { registerSession } from '../redux/actions';

import * as ROUTES from '../constants/routes';

const LOGIN_URL = `${BASE_URL}/login`;

const SignInPage = ({ history }) => (
	<div>
		<h2>Please Log In</h2>
		<SignInForm history={history} />
	</div>
);

const INITIAL_STATE = {
	userName: '',
	password: '',
	error: null
};

class SignInForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		const { userName, password } = this.state;

		const userObj = {
			username: userName,
			password: password
		};

		const { history } = this.props;

		fetch(LOGIN_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userObj)
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (data.errorMessage) {
					const error = new Error(data.errorMessage)
					this.setState({ error });
				} else {
					store.dispatch(registerSession(data.data));
					this.setState({ ...INITIAL_STATE });
					history.push(ROUTES.LANDING);
				}
			})
			.catch(error => {
				this.setState({ error });
			});

		event.preventDefault();
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { userName, password, error } = this.state;

		const isInvalid = password === '' || userName === '';

		return (
			<form onSubmit={this.onSubmit}>
				<input name="userName" value={userName} onChange={this.onChange} type="text" placeholder="User Name" />
				<input
					name="password"
					value={password}
					onChange={this.onChange}
					type="password"
					placeholder="Password"
				/>
				<button disabled={isInvalid} type="submit">Sign In</button>
				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

export default withRouter(SignInPage);

export { SignInForm };
