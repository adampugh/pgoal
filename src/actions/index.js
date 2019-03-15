import database, { firebase, googleAuthProvider } from '../firebase/firebase';
import pokemonRandomName from 'pokemon-random-name';
import { setupTasks } from '../utils/helpers';
import uuid from 'uuid/v1';

// create team
export const createTeam = (team) => async dispatch  => {
    dispatch({ type: 'CREATE_TEAM', team })
};

export const startCreateTeam = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const emptyTeam = { 
            name: `Team ${pokemonRandomName()}`,
            pokemon: [
                { id: uuid(), name: '', sprite: '', skill: '', tasks: setupTasks()},
                { id: uuid(), name: '', sprite: '', skill: '', tasks: setupTasks()},
                { id: uuid(), name: '', sprite: '', skill: '', tasks: setupTasks()},
                { id: uuid(), name: '', sprite: '', skill: '', tasks: setupTasks()},
                { id: uuid(), name: '', sprite: '', skill: '', tasks: setupTasks()},
                { id: uuid(), name: '', sprite: '', skill: '', tasks: setupTasks()}
            ]
        }

        return database.ref(`users/${uid}/teams`).push(emptyTeam).then((ref) => {
            const team = {
                ...emptyTeam,
                id: ref.key
            }
            dispatch(createTeam(team));
        })
    };
};

// delete team
export const deleteTeam = (id) => dispatch => {
    dispatch({ type: 'DELETE_TEAM', id });
};

export const startDeleteTeam = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/teams/${id}`).remove().then(() => {
            dispatch(deleteTeam(id));
        })
    }
}

// add pokemon
export const addPokemon = (pokemon, teamId) => dispatch => {
    dispatch({ type: 'ADD_POKEMON', pokemon, teamId})
};

export const startAddPokemon = (pokemon, teamId, index) => {
    const newPokemon = {
        ...pokemon,
        tasks: setupTasks()
    }
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/teams/${teamId}/pokemon/${index}`).update(newPokemon).then(() => {
            dispatch(addPokemon(pokemon, teamId));
        });
    }
}


// delete pokemon
export const deletePokemon = (pokemonId, teamId, emptyPokemon) => dispatch => {
    dispatch({ type: 'DELETE_POKEMON', pokemonId, teamId, emptyPokemon});
}

export const startDeletePokemon = (pokemonId, teamId, index) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const emptyPokemon = {
            id: pokemonId, 
            name: '', 
            sprite: '', 
            skill: 'Skill', 
            tasks: setupTasks(),
            currentStage: 0
        }

        return database.ref(`users/${uid}/teams/${teamId}/pokemon/${index}`).update(emptyPokemon).then(() => {
            dispatch(deletePokemon(pokemonId, teamId, emptyPokemon));
        });
    }
}


// update skill name
export const updateSkillName = (pokemonId, teamId, skillName) => dispatch => {
    dispatch({ type: 'UPDATE_SKILL_NAME', pokemonId, teamId, skillName });
}

export const startUpdateSkillName = (pokemonId, teamId, skillName, index) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/teams/${teamId}/pokemon/${index}/skill`).set(skillName).then(() => {
            dispatch(updateSkillName(pokemonId, teamId, skillName));
        });
    }
}


// update task
export const updateTaskText = (pokemonId, teamId, taskText, index) => dispatch => {
    dispatch({ type: 'UPDATE_TASK_TEXT', pokemonId, teamId, taskText, index});
}

export const startUpdateTaskText = (pokemonId, teamId, taskText, index, pokemonIndex) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/teams/${teamId}/pokemon/${pokemonIndex}/tasks/${index}/text`).set(taskText).then(() => {
            dispatch(updateTaskText(pokemonId, teamId, taskText, index));
        });
    }
}

// complete task
export const completeTask = (pokemonId, teamId, checked, index) => dispatch => {
    dispatch({ type: 'COMPLETE_TASK', pokemonId, teamId, checked, index});
}

export const startCompleteTask = (pokemonId, teamId, checked, index, pokemonIndex) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/teams/${teamId}/pokemon/${pokemonIndex}/tasks/${index}/complete`).set(checked).then(() => {
            dispatch(completeTask(pokemonId, teamId, checked, index));
        });
    }
}


// can evolve
export const canEvolve = (pokemonId, teamId, canEvolve) => dispatch => {
    dispatch({ type: 'CAN_EVOLVE', pokemonId, teamId, canEvolve });
}

export const startCanEvolve = (pokemonId, teamId, canPokemonEvolve, pokemonIndex) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/teams/${teamId}/pokemon/${pokemonIndex}/canEvolve`).set(canPokemonEvolve).then(() => {
            dispatch(canEvolve(pokemonId, teamId, canPokemonEvolve));
        });
    }
}


// update team name
export const updateTeamName = (teamId, name) => dispatch => {
    dispatch({ type: 'UPDATE_TEAM_NAME', teamId, name })
}

export const startUpdateTeamName = (teamId, name) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/teams/${teamId}/name`).set(name).then(() => {
            dispatch(updateTeamName(teamId, name));
        });
    }
}

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};


export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    }
}



// fetch teams
export const fetchTeams = (teams) => ({
    type: 'FETCH_TEAMS',
    teams
});

export const startFetchTeams = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/teams`).once('value').then((snapshot) => {
            const teams = [];

            snapshot.forEach((childSnapshot) => {
                const pokemon = [];
                for (let key in childSnapshot.val().pokemon) {
                    const tasks = [];

                    for (let task in childSnapshot.val().pokemon[key].tasks) {
                        tasks.push(childSnapshot.val().pokemon[key].tasks[task]);
                    }
                    
                    pokemon.push({
                        ...childSnapshot.val().pokemon[key],
                        tasks
                    })
                }

                teams.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val(),
                    pokemon
                })
            });

            dispatch(fetchTeams(teams));
        });
    }
}