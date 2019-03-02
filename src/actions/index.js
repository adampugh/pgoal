
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

// update task
export const updateTaskText = (pokemonId, teamId, taskText, index) => dispatch => {
    dispatch({ type: 'UPDATE_TASK_TEXT', pokemonId, teamId, taskText, index});
}

// complete task
export const completeTask = (pokemonId, teamId, checked, index) => dispatch => {
    dispatch({ type: 'COMPLETE_TASK', pokemonId, teamId, checked, index});
}

export const canEvolve = (pokemonId, teamId, canEvolve) => dispatch => {
    dispatch({ type: 'CAN_EVOLVE', pokemonId, teamId, canEvolve });
}