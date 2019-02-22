import actions from '../actions';

const initialState = {
    teams: [
        {
            name: 'development',
            pokemon: [{
                name: 'bulbasaur',
                sprite: '',
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
        }, {
            name: 'language',
            pokemon: [{
                name: 'bidoof',
            }, {
                name: 'machamp'
            }, {
                name: 'porygon'
            }, {
                name: 'muk'
            }, {
                name: 'arbok'
            }, {
                name: 'garchomp'
            }]
        }
    ]
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
    // cases
    default:
        return state
    }
}