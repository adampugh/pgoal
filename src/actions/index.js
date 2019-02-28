
// redux thunk
export const createTeam = () => async dispatch  => {
    // const response = await jsonPlaceholder.get('/posts');
    dispatch({ type: 'CREATE_TEAM'})
};


export const deleteTeam = (id) => dispatch => {
    dispatch({ type: 'DELETE_TEAM', id });
};


// add pokemon
export const addPokemon = (pokemon, teamId) => dispatch => {
    dispatch({ type: 'ADD_POKEMON', pokemon, teamId})
};


// delete pokemon
export const deletePokemon = (pokemonId, teamId) => dispatch => {
    dispatch({ type: 'DELETE_POKEMON', pokemonId, teamId});
}


// evolve pokemon


// update skill name
export const updateSkillName = (pokemonId, teamId, skillName) => dispatch => {
    dispatch({ type: 'UPDATE_SKILL_NAME', pokemonId, teamId, skillName });
}

// add task


// complete task


// delete task