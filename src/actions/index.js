
// redux thunk
export const createTeam = () => async dispatch  => {
    // const response = await jsonPlaceholder.get('/posts');
    dispatch({ type: 'CREATE_TEAM'})
};


export const deleteTeam = (id) => dispatch => {
    dispatch({ type: 'DELETE_TEAM', id });
};


// add pokemon



// delete pokemon



// evolve pokemon



// add todo


// complete todo


// delete todo