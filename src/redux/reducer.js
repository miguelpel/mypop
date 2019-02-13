const initialState = () => {
	return {
		userData: null,
		pageResults: []
	};
};

const reducer = (state = initialState(), action) => {
	let newUserData = { ...state.userData };
	let newPageResults = [...state.pageResults];
	switch (action.type) {
		case 'register session':
			newUserData = action.payload;
			break;
		case 'unregister session':
			return initialState()
		default:
			return state;
	}
	return {
		userData: newUserData,
		pageResults: newPageResults
	};
};

export default reducer;
