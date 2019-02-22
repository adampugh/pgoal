import React, { Component } from 'react';
import pokeapi from '../../apis/pokeapi';
import { FaPlusSquare } from 'react-icons/fa';

// don't fetch sprites - should be saved when pokemon is added

class TeamCard extends Component {
    // state = {
    //     teamSprites: []
    // }


    componentDidMount() {
        // get all sprites
        // this.props.team.pokemon.map(pokemon => {
        //     pokeapi.get(`/pokemon/${pokemon.name}`)
        //         .then(pokemon => {
        //             this.setState({ 
        //                 teamSprites: [...this.state.teamSprites, pokemon.data.sprites.front_default]
        //             });
        //     });
        // });
    }

    render() {
        const { name, pokemon} = this.props.team;

        return (
            <div className="container">
                <div className="teamCard">
                    <h1>{name}</h1>
                    <div className="teamCard__pokemon">
                    {
                        pokemon.map(pokemon => pokemon.sprite 
                            ? <img src={pokemon.sprite} /> 
                            : <div className="teamCard__plus"><FaPlusSquare /></div>
                        )
                    }
                    </div>
                </div>
            </div>
        );
    };
};


export default (TeamCard);