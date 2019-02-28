import uuid from 'uuid/v1';
import pokemonRandomName from 'pokemon-random-name';

const initialTask = {
    text: '',
    complete: false
}

const setupTasks = () => {
    let tasks = [];
    for ( let i = 0; i < 10; i++) {
        tasks.push(initialTask);
    }
    return tasks;
}


const initialState = {
    teams: [
        {
            id: '1266634',
            name: 'development',
            pokemon: [{
                id: '1234',
                name: 'bulbasaur',
                skill: 'skill',
                sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
                tasks: [{
                    text: 'complete course',
                    complete: false
                }],
                canEvolve: false,
                stages: 9,
                currentStage: 2,
            }, 
            { id: uuid(), name: '', sprite: '', skill: 'Skill', tasks: setupTasks()},
            { id: uuid(), name: '', sprite: '', skill: 'Skill', tasks: setupTasks()},
            { id: uuid(), name: '', sprite: '', skill: 'Skill', tasks: setupTasks()},
            { id: uuid(), name: '', sprite: '', skill: 'Skill', tasks: setupTasks()},
            { id: uuid(), name: '', sprite: '', skill: 'Skill', tasks: setupTasks()}]
        }
    ]
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
    // cases
        case 'CREATE_TEAM':
            return {
                teams: [...state.teams, { 
                    id: uuid(),
                    name: `Team ${pokemonRandomName()}`,
                    pokemon: [
                        { id: uuid(), name: '', sprite: '', skill: 'Skill', tasks: setupTasks()},
                        { id: uuid(), name: '', sprite: '', skill: 'Skill', tasks: setupTasks()},
                        { id: uuid(), name: '', sprite: '', skill: 'Skill', tasks: setupTasks()},
                        { id: uuid(), name: '', sprite: '', skill: 'Skill', tasks: setupTasks()},
                        { id: uuid(), name: '', sprite: '', skill: 'Skill', tasks: setupTasks()},
                        { id: uuid(), name: '', sprite: '', skill: 'Skill', tasks: setupTasks()}
                    ]
                }]
            };
        case 'DELETE_TEAM':
            return {
                teams: state.teams.filter(team => team.id !== action.id)
            }
        case 'ADD_POKEMON':
            console.log(state);
            return {
                teams: state.teams.map(team => {
                    if (team.id !== action.teamId) {
                        return {...team}
                    } else {
                        return {
                            ...team,
                            pokemon: team.pokemon.map(pokemon => {
                                if (pokemon.id !== action.pokemon.id) {
                                    return {...pokemon}
                                } else {
                                    return {...action.pokemon, tasks: setupTasks()}
                                }
                            })
                        }   
                    }
                })
            }
        case 'DELETE_POKEMON':
            return {
                teams: state.teams.map(team => {
                    if (team.id !== action.teamId) {
                        return {...team}
                    } else {
                        return {
                            ...team,
                            pokemon: team.pokemon.map(pokemon => {
                                if (pokemon.id !== action.pokemonId) {
                                    return {...pokemon}
                                } else {
                                    return { id: action.pokemonId, name: '', sprite: '', skill: 'Skill', tasks: setupTasks()}
                                }
                            })
                        }   
                    }
                })
            }
        case 'UPDATE_SKILL_NAME':
            return {
                teams: state.teams.map(team => {
                    if (team.id !== action.teamId) {
                        return {...team}
                    } else {
                        return {
                            ...team,
                            pokemon: team.pokemon.map(pokemon => {
                                if (pokemon.id !== action.pokemonId) {
                                    return {...pokemon}
                                } else {
                                    return { ...pokemon, skill: action.skillName }
                                }
                            })
                        }   
                    }
                })
            }
        default:
            return state
    }
}