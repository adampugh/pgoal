import React, { Component } from 'react';
import pokeapi from '../../apis/pokeapi';
import axios from 'axios';
import { connect } from 'react-redux';
import { addPokemon, deletePokemon } from '../../actions';
import Modal from 'react-responsive-modal';
import { FaTrashAlt, FaPlusSquare, FaSearch, FaAngleDoubleUp, FaStar } from 'react-icons/fa';

import Egg from '../../assets/images/egg.gif';


class PokemonCard extends Component {
    state = {
        open: false,
        openDelete: false,
        openEvolve: false,
        query: '',
        searchResultSprite: '',
        noSearchResults: false,
        // pokemon data
        data: {},
        stages: 1,
        totalStages: null,
        evolutionChainId: null,
        evolutionsArr: [],
        evolutionsSprites: []
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.resetSearch();
        this.setState({ open: false });
    };

    onOpenDeleteModal = () => {
        this.setState({ openDelete: true });
    };
    
    onCloseDeleteModal = () => {
        this.setState({ openDelete: false });
    };

    onOpenEvolveModal = () => {
        this.setState({ openEvolve: true });
        this.getEvolutions();
    };
    
    onCloseEvolveModal = () => {
        this.setState({ 
            openEvolve: false,
            evolutionsArr: [],
            evolutionsSprites: []
        });
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

    searchForPokemon = (e, pokemonName) => {
        if (e) {
            e.preventDefault();
        }
        this.resetSearch();

        pokeapi.get(`/pokemon/${ pokemonName || this.state.query }`)
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
                            canEvolve: false
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

    deletePokemon = () => {
        this.props.deletePokemon(this.props.pokemon.id, this.props.teamId);
        this.onCloseDeleteModal()
    }

    getEvolutions = () => {
        const { evolutionChainId, name } = this.props.pokemon;
        // search for evolutions
        pokeapi.get(`/evolution-chain/${evolutionChainId}`)
            .then((response) => {
                this.checkPokemonChain(response.data.chain, name);
                console.log(this.state.evolutionsArr);
                // map the array and add sprite property
                if (this.state.evolutionsArr.length > 0) {
                    this.state.evolutionsArr.map(pokemon => {
                        const { name } = pokemon.species;
                        pokeapi.get(`/pokemon/${name}`)
                            .then((response) => {
                                this.setState({
                                    evolutionsArr: this.state.evolutionsArr.map(pokemon => {
                                        if (pokemon.species.name !== name) {
                                            return {...pokemon}
                                        } else {
                                            return {...pokemon, sprite: response.data.sprites.front_default}
                                        }
                                    })
                                });
                            }).catch((error) => {
                                
                            })
                    });
                } else {
                    console.log('final evolution');
                }
            });
        // if they exist show new sprites
        // boost stage up
    }

    checkPokemonChain = (chain, name) => {
        // if found pokemon return array of evolutions
        if (chain.species.name === name) {
            this.setState({ evolutionsArr: chain.evolves_to});
            return chain.evolves_to;
        } else {
            // check each evolutions name
            chain.evolves_to.map(pokemon => {
                if (pokemon.species.name === name) {
                    return this.checkPokemonChain(pokemon, name);
                }
            });
        }
    }

    evolvePokemon = async (name) => {
        await pokeapi.get(`/pokemon/${name}`)
            .then((response) => {
                this.setState({
                    searchResultSprite: response.data.sprites.front_default,
                    query: '',
                    data: response.data
                })
            }).catch((error) => {
                
            })


        this.addPokemon();
    }


    render() {
        const { sprite, name, canEvolve, stage } = this.props.pokemon;
        const { open, searchResultSprite, noSearchResults, query, openDelete, openEvolve } = this.state;

        return (
            <div className="pokemonCard">
                <Modal open={open} onClose={this.onCloseModal} center>
                    <form>
                        <input 
                            placeholder="Search for a pokemon..."
                            onChange={(e) => this.handleInputChange(e)}
                            value={query}
                        />
                        <button onClick={e => this.searchForPokemon(e)}><FaSearch /></button>
                    </form>
                    <div>
                        { searchResultSprite && (
                            <div>
                                <img src={searchResultSprite} alt="sprite"/>
                                <button className="btn" onClick={this.addPokemon}>Add {this.state.data.name}</button>
                            </div>
                        )}
                        { noSearchResults && <h1>Sorry no search results</h1>}
                    </div>
                </Modal>
                <Modal open={openDelete} onClose={this.onCloseDeleteModal} center>
                    <h1>Are you sure you want to delete?</h1>
                    
                    <button className="btn" onClick={this.deletePokemon}>Yes</button>
                    <button className="btn" onClick={this.onCloseDeleteModal}>No</button>
                </Modal>
                <Modal open={openEvolve} onClose={this.onCloseEvolveModal} center>
                    <h1>Congrats!</h1>
                    { this.state.evolutionsArr.map((pokemon, i) => {
                        return (
                            <div key={i}>
                                <img src={pokemon.sprite} alt="sprite" />
                                <button className="btn" onClick={() => this.evolvePokemon(pokemon.species.name)}>Evolve</button>
                            </div>
                        )
                    })}
                </Modal>
                <div className="pokemonCard__icons">
                    <FaTrashAlt onClick={this.onOpenDeleteModal} />
                    { canEvolve && <FaAngleDoubleUp onClick={this.onOpenEvolveModal}/>}
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
                {/* <h2>can Evolve? {canEvolve === true ? 'true' : 'false'}</h2> */}
                <div className="pokemonCard__stars">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
            </div>
        )
        
    }
}

export default connect(null, { addPokemon, deletePokemon })(PokemonCard);