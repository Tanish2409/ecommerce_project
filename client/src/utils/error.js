export const raiseError = (initState, setError, error) => {
	setError({
		...initState,
		isError: true,
		errorMessage: error,
	});
};
