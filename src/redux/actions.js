export const registerSession = userData => {
	return {
		type: 'register session',
		payload: userData
	};
};

export const unregisterSession = () => {
	return {
		type: 'unregister session'
	};
};
