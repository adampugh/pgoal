import uuid from 'uuid/v1';

import { setupTasks } from '../utils/helpers';


export default function reducer(state = {}, action) {
    switch (action.type) {
    // cases
        // case 'LOGIN':
        //     return {
        //         uid: action.uid,
        //         ...state
        //     }
        // case 'LOGOUT':
        //     return {};
        case 'FETCH_TEAMS':
            return {
                teams: action.teams,
                // ...state
            }
        case 'CREATE_TEAM':
            return {
                teams: [...state.teams, action.team],
                // ...state
            };
        case 'DELETE_TEAM':
            return {
                teams: state.teams.filter(team => team.id !== action.id),
                // ...state
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
                }),
                // ...state
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
                                    return { ...action.emptyPokemon }
                                }
                            })
                        }   
                    }
                }),
                // ...state
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
                }),
                // ...state
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
                }),
                // ...state
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
                }),
                // ...state
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
                    }),
                    // ...state
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
                }),
                // ...state
            }
        default:
            return state;
    }
}