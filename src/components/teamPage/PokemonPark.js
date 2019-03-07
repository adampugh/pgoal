import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTeamName } from '../../actions';

import Card from './Card';


// 1. look at state coming from reducer
// 2. map over state for each pokemon card
// 3. render card for each passing data or not passing data


class PokemonPark extends Component {
    
    render() {
        const teamId = this.props.team.id;
        const { name } = this.props.team;
        const { updateTeamName } = this.props;

        return (
            <>
                <div className="container pokemonPark">
                    <h1>
                        <input 
                            value={name}
                            onChange={(e) => updateTeamName(teamId, e.target.value)}
                        />
                    </h1>
                    <div className="pokemonPark__bg">
                        <div className="pokemonPark__card">
                            {this.props.team.pokemon.map((pokemon, i) => <Card pokemon={pokemon} key={i} teamId={teamId} />)} 
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default connect(null, { updateTeamName })(PokemonPark);