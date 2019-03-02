import React, { Component } from 'react';

// import PokemonCard from './PokemonCard';
import Card from './Card';


// 1. look at state coming from reducer
// 2. map over state for each pokemon card
// 3. render card for each passing data or not passing data


class PokemonPark extends Component {
    
    render() {
        const teamId = this.props.team.id;

        return (
            <div className="container pokemonPark">
                <div className="pokemonPark__bg">
                    <div className="pokemonPark__card">
                        {this.props.team.pokemon.map((pokemon, i) => <Card pokemon={pokemon} key={i} teamId={teamId} />)} 
                    </div>
                </div>
            </div>
        )
    }
}

export default PokemonPark;