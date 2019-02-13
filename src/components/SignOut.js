import React from 'react';
import { store } from '../redux/store';
import { unregisterSession } from '../redux/actions';

const SignOutButton = () => (
	<button type="button" onClick={evt => store.dispatch(unregisterSession())}>
		Sign Out
	</button>
);

export default SignOutButton;
