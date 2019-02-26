import React, { Component } from 'react';
import pokeapi from '../../apis/pokeapi';
import { FaTrashAlt, FaPlusSquare } from 'react-icons/fa';

import Egg from '../../assets/images/egg.gif';

class PokemonCard extends Component {
    state = {
        spriteURL: null,
        name: null
    }

    componentDidMount() {
        if (this.props.pokemon ) {
            this.getSprite();
        }
    }

    // add pokemon 
    // search + select pokemon
    // work out number of evolutions - before + after + 1 for current stage - add 6 stages (5 stars + egg)
    // send to redux the current stage + stages + name + sprite + percentage complete 



    getSprite = () => {
        pokeapi.get(`/pokemon/${this.props.pokemon}`)
            .then(pokemon => { 
                this.setState({ 
                    spriteURL: pokemon.data.sprites.front_default,
                    name: pokemon.data.name
                });
        });
    }


    render() {
        return (
            <div className="pokemonCard">
                <div className="pokemonCard__icons">
                    <FaTrashAlt />
                    <FaPlusSquare />
                </div>
                {
                    this.state.spriteURL 
                        ? <img src={this.state.spriteURL} alt={this.state.name}/>
                        : ( 
                            <div className="pokemonCard__egg">
                                <img src={Egg} alt="egg" />
                            </div>
                        )      
                }
            </div>
        )
        
    }
}

export default PokemonCard;