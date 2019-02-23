import actions from '../actions';
import uuid from 'uuid/v1';
import { FaPlusSquare, FaUserMinus } from 'react-icons/fa';

const initialState = {
    teams: [
        {
            id: '1234',
            name: 'development',
            pokemon: [{
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
                name: 'cloyster'
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
                    name: 'new team',
                    pokemon: [
                        { id: uuid(), name: '', sprite: '', todos: []},
                        { id: uuid(), name: '', sprite: '', todos: []},
                        { id: uuid(), name: '', sprite: '', todos: []},
                        { id: uuid(), name: '', sprite: '', todos: []},
                        { id: uuid(), name: '', sprite: '', todos: []},
                        { id: uuid(), name: '', sprite: '', todos: []}
                    ]
                }]
            }
        default:
            return state
    }
}