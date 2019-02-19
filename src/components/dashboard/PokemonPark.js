import React, { Component } from 'react';
import { connect } from 'react-redux';

import PokemonCard from './PokemonCard';
// 1. look at state coming from reducer
// 2. map over state for each pokemon card
// 3. render card for each passing data or not passing data


class PokemonPark extends Component {
    state = {
        pokemon: ['bulbasaur', 'cloyster', 'nuzleaf', 'dragonite', 'blastoise', 'mewtwo']
    }


    render() {
        return (
            <div className="container pokemonPark">
                <div className="pokemonPark__bg">
                    <div className="pokemonPark__card">
                        {this.state.pokemon.map((pokemon, i) => <PokemonCard pokemon={pokemon} key={i} />)} 
                    </div>
                </div>
            </div>
        )
    }
}

export default PokemonPark;