import actions from '../actions';
import uuid from 'uuid/v1';
import pokemonRandomName from 'pokemon-random-name';
import { FaPlusSquare, FaUserMinus } from 'react-icons/fa';


const initialState = {
    teams: [
        {
            id: '1266634',
            name: 'development',
            pokemon: [{
                id: '1234',
                name: 'bulbasaur',
                sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
                todos: [{
                    text: 'complete course',
                    complete: false
                }],
                canEvolve: false,
                shiny: false,
                numberOfEvolutions: 2,
                egg: false
            }, {
                name: ''
            }, {
                name: 'charizard'
            }, {
                name: 'nuzleaf'
            }, {
                name: 'ditto'
            }, {
                name: 'abra'
            }]
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
                        { id: uuid(), name: '', sprite: '', skill: 'Skill', todos: []},
                        { id: uuid(), name: '', sprite: '', skill: 'Skill', todos: []},
                        { id: uuid(), name: '', sprite: '', skill: 'Skill', todos: []},
                        { id: uuid(), name: '', sprite: '', skill: 'Skill', todos: []},
                        { id: uuid(), name: '', sprite: '', skill: 'Skill', todos: []},
                        { id: uuid(), name: '', sprite: '', skill: 'Skill', todos: []}
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
                                    return {...action.pokemon}
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