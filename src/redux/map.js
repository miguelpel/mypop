export const mapStateToProps = function(state) {
	return {
		userData: state.userData,
		pageResults: state.pageResults
	};
};