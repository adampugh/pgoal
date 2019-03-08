import React, { Component } from 'react';
import PokemonCard from './PokemonCard';
import TaskCard from './TaskCard';


class Card extends Component {
    render() {
        const { pokemon, teamId, index } = this.props;

        return (
            <div>
                <PokemonCard pokemon={pokemon} teamId={teamId} index={index} />
                <TaskCard pokemon={pokemon} teamId={teamId} index={index} />
            </ div>
        )
    }
}

export default Card;