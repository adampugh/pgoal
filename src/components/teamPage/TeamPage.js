import React, { Component } from 'react';
import pokeapi from '../../apis/pokeapi';

import Navbar from '../ui/navbar';
import PokemonPark from './PokemonPark';
// import PokemonCard from './PokemonCard';

class TeamPage extends Component {

    componentDidMount() {
        pokeapi.get('/pokemon')
            .then(response => {
                console.log(response.data.results);
                response.data.results.map(pokemon => {
                    console.log(pokemon.name);
                });
            });
    }

    render() {
        return (
            <>
                <Navbar />
                <PokemonPark />
            </>
        );
    }
}

export default TeamPage;
