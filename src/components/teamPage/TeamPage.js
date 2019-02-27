import React, { Component } from 'react';
import pokeapi from '../../apis/pokeapi';
import { Redirect } from 'react-router';

import Navbar from '../ui/navbar';
import PokemonPark from './PokemonPark';
// import PokemonCard from './PokemonCard';

class TeamPage extends Component {
    state = {
        redirect: false
    }

    componentDidMount() {
        // if link doesn't come from homepage redirect
        if (!this.props.location.state) {
            this.setState({
                redirect: true
            })
        }
    }

    // componentDidMount() {
    //     pokeapi.get('/pokemon')
    //         .then(response => {
    //             console.log(response.data.results);
    //             response.data.results.map(pokemon => {
    //                 console.log(pokemon.name);
    //             });
    //         });

    //     console.log(this.props.location.state.team);
    // }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/" />
        }

        return (
            <>
                <Navbar />
                <PokemonPark />
            </>
        );
    }
}

export default TeamPage;
