
// redux thunk
export const createTeam = () => async dispatch  => {
    // const response = await jsonPlaceholder.get('/posts');
    dispatch({ type: 'CREATE_TEAM'})
};


export const deleteTeam = () => dispatch => {
    dispatch({ type: 'DELETE_TEAM' });
};