import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Page from './Page';
import SignInPage from './SignInPage';

import * as ROUTES from '../constants/routes';

const App = () => {
	return (
		<Router>
			<div className="App">
				<Route exact path={ROUTES.LANDING} component={Page} />
				<Route path={ROUTES.SIGN_IN} component={SignInPage} />
			</div>
		</Router>
	);
}

export default App;
