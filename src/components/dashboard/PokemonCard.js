import React, { Component } from 'react';
import pokeapi from '../../apis/pokeapi';
import { FaTrashAlt, FaPlusSquare } from 'react-icons/fa';

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
                        : <h1>hello</h1>
                }
            </div>
        )
        
    }
}

export default PokemonCard;