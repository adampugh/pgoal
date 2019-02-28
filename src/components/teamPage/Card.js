import React, { Component } from 'react';
import PokemonCard from './PokemonCard';
import TaskCard from './TaskCard';


class Card extends Component {
    render() {
        const { pokemon, teamId } = this.props;

        return (
            <div>
                <PokemonCard pokemon={pokemon} teamId={teamId} />
                <TaskCard pokemon={pokemon} />
            </ div>
        )
    }
}

export default Card;