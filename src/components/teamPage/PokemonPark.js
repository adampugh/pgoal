import React, { Component } from 'react';
import { connect } from 'react-redux';

// import PokemonCard from './PokemonCard';
import Card from './Card';


// 1. look at state coming from reducer
// 2. map over state for each pokemon card
// 3. render card for each passing data or not passing data


class PokemonPark extends Component {
    state = {
        pokemon: ['gengar', null, 'metagross', 'steelix', 'litten', 'ninetales']
    }


    render() {
        return (
            <div className="container pokemonPark">
                <div className="pokemonPark__bg">
                    <div className="pokemonPark__card">
                        {this.state.pokemon.map((pokemon, i) => <Card pokemon={pokemon} key={i} />)} 
                    </div>
                </div>
            </div>
        )
    }
}

export default PokemonPark;