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
                name: 'eevee',
                skill: 'skill',
                sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
                tasks: [
                    { text: '', complete: false},
                    { text: '', complete: true},
                    { text: '', complete: true},
                    { text: '', complete: true},
                    { text: '', complete: true},
                    { text: '', complete: true},
                    { text: '', complete: true},
                    { text: '', complete: true},
                    { text: '', complete: true},
                    { text: '', complete: true},
                ],
                canEvolve: false,
                stages: 8,
                currentStage: 2,
                evolutionChainId: 67,
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
        case 'LOGIN':
            return {}
        case 'LOGOUT':
            return {}
        case 'CREATE_TEAM':
            return {
                teams: [...state.teams, { 
                    id: uuid(),
                    name: `Team ${pokemonRandomName()}`,
                    pokemon: [
                        { id: uuid(), name: '', sprite: '', skill: '', tasks: setupTasks()},
                        { id: uuid(), name: '', sprite: '', skill: '', tasks: setupTasks()},
                        { id: uuid(), name: '', sprite: '', skill: '', tasks: setupTasks()},
                        { id: uuid(), name: '', sprite: '', skill: '', tasks: setupTasks()},
                        { id: uuid(), name: '', sprite: '', skill: '', tasks: setupTasks()},
                        { id: uuid(), name: '', sprite: '', skill: '', tasks: setupTasks()}
                    ]
                }]
            };
        case 'DELETE_TEAM':
            return {
                teams: state.teams.filter(team => team.id !== action.id)
            }
        case 'ADD_POKEMON':
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
        case 'UPDATE_TASK_TEXT':
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
                                    return { 
                                        ...pokemon, 
                                        tasks: pokemon.tasks.map((task, i) => {
                                            if (i !== action.index) {
                                                return {...task}
                                            } else {
                                                return {...task, text: action.taskText}
                                            }
                                        })
                                    }
                                }
                            })
                        }   
                    }
                })
            }
        case 'COMPLETE_TASK':
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
                                    return { 
                                        ...pokemon, 
                                        tasks: pokemon.tasks.map((task, i) => {
                                            if (i !== action.index) {
                                                return {...task}
                                            } else {
                                                return {...task, complete: action.checked}
                                            }
                                        })
                                    }
                                }
                            })
                        }   
                    }
                })
            }
            case 'CAN_EVOLVE':
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
                                        return { 
                                            ...pokemon, 
                                            canEvolve: action.canEvolve
                                        }
                                    }
                                })
                            }   
                        }
                    })
                }
            case 'UPDATE_TEAM_NAME':
            return {
                teams: state.teams.map(team => {
                    if (team.id !== action.teamId) {
                        return {...team}
                    } else {
                        return {
                            ...team,
                            name: action.name
                        }   
                    }
                })
            }
        default:
            return state
    }
}