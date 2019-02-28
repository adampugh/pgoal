import React, { Component } from 'react';
import pokeapi from '../../apis/pokeapi';
import axios from 'axios';
import { connect } from 'react-redux';
import { addPokemon } from '../../actions';
import Modal from 'react-responsive-modal';
import { FaTrashAlt, FaPlusSquare } from 'react-icons/fa';

import Egg from '../../assets/images/egg.gif';


class PokemonCard extends Component {
    state = {
        open: false,
        query: '',
        searchResultSprite: '',
        noSearchResults: false,
        // pokemon data
        data: {},
        stages: 1,
        evolutionChainId: null
    }

    componentDidMount() {
        console.log(this.props.teamId);
    }


    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.resetSearch();
        this.setState({ open: false });
    };

    handleInputChange = (e) => {
        this.setState({
          query: e.target.value
        });
    }

    resetSearch = () => {
        this.setState({
            searchResultSprite: '',
            noSearchResults: false,
            query: '',
            stages: 1,
            evolutionChainId: null,
            data: {}
        });
    }

    searchForPokemon = (e) => {
        e.preventDefault();
        this.resetSearch();

        pokeapi.get(`/pokemon/${this.state.query}`)
            .then((response) => {
                this.setState({
                    searchResultSprite: response.data.sprites.front_default,
                    query: '',
                    data: response.data
                })
            }).catch((error) => {
                this.setState({
                    noSearchResults: true
                })
            })
    }

    totalStages = (chain, stages) => {
        if (chain.evolves_to.length > 0) {
            stages++;
            this.totalStages(chain.evolves_to[0], stages);
        } else {
            this.setState({ stages });
        }
    }


    addPokemon = () => {
        const { data } = this.state;

        pokeapi.get(`/pokemon-species/${data.name}`)
            .then((response) => {
                axios.get(response.data.evolution_chain.url)
                    .then((response) => {
                        this.setState({ evolutionChainId: response.data.id })
                        this.totalStages(response.data.chain, 1);

                        const pokemon = {
                            name: data.name,
                            currentStage: 1,
                            stages: this.state.stages + 6, // 1 (egg) + 5 (stars)
                            sprite: data.sprites.front_default,
                            percentage: 0,
                            percentageValue: null,
                            id: this.props.pokemon.id,
                            evolutionChainId: this.state.evolutionChainId,
                            
                        }
                        
                        this.props.addPokemon(pokemon, this.props.teamId);
                        this.onCloseModal();
                    });
            }).catch((error) => {
                this.setState({
                    noSearchResults: true
                })
            })
    }

    // add pokemon 
    // search + select pokemon
    // work out number of evolutions - before + after + 1 for current stage - add 6 stages (5 stars + egg)
    // send to redux the current stage + stages + name + sprite + percentage complete 


    render() {
        const { sprite, name } = this.props.pokemon;
        const { open, searchResultSprite, noSearchResults, query } = this.state;

        return (
            <div className="pokemonCard">
                <Modal open={open} onClose={this.onCloseModal} center>
                    <form>
                        <input 
                            placeholder="Search for a pokemon..."
                            onChange={(e) => this.handleInputChange(e)}
                            value={query}
                        />
                        <button onClick={e => this.searchForPokemon(e)}>Search</button>
                    </form>
                    <div>
                        { searchResultSprite && (
                            <div>
                                <img src={searchResultSprite} />
                                <button className="btn" onClick={this.addPokemon}>Add {this.state.data.name}</button>
                            </div>
                        )}
                        { noSearchResults && <h1>Sorry no search results</h1>}
                    </div>
                </Modal>
                <div className="pokemonCard__icons">
                    <FaTrashAlt />
                    <FaPlusSquare onClick={this.onOpenModal} />
                </div>
                {
                    sprite
                        ? <img src={sprite} alt="pokemon sprite" />
                        : name 
                            ? ( 
                                <div className="pokemonCard__egg">
                                    <img src={Egg} alt="egg" />
                                </div>
                            ) : (
                                <div className="pokemonCard__egg pokemonCard__egg--empty">
                                    <img src={Egg} alt="egg" />
                                </div>
                            )     
                }
            </div>
        )
        
    }
}

export default connect(null, { addPokemon })(PokemonCard);