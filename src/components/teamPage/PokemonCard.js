import React, { Component } from 'react';
import pokeapi from '../../apis/pokeapi';
import axios from 'axios';
import { connect } from 'react-redux';
import { startAddPokemon, startDeletePokemon } from '../../actions';
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
        currentStage: null,
        evolutionChainId: null,
        evolutionsArr: [],
        evolutionsSprites: [],
        stars: 0,
        shinyEvolution: false,
        mega: false
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
            evolutionsSprites: [],
            shinyEvolution: false,
            mega: false,
            

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

    searchForPokemon = (e) => {
        e.preventDefault();
        this.resetSearch();

        pokeapi.get(`/pokemon/${ this.state.query.toLowerCase() }`)
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
        const { data, stars, evolutionChainId, mega } = this.state;
        const { skill, currentStage, stages, percentage, id } = this.props.pokemon;
        
        if (mega) {
            const pokemon = {
                name: data.name,
                currentStage: (currentStage + 1),
                stages,
                sprite: data.sprites.front_default,
                percentage,
                percentageValue: null,
                id,
                evolutionChainId,
                canEvolve: false,
                skill: skill || '',
                stars: stars || 0,
            }

            console.log(pokemon);
    
            this.props.startAddPokemon(pokemon, this.props.teamId, this.props.index);
            return this.onCloseModal();
        }


        pokeapi.get(`/pokemon-species/${data.name}`)
            .then((response) => {
                axios.get(response.data.evolution_chain.url)
                    .then((response) => {
                        this.setState({ evolutionChainId: response.data.id })
                        this.totalStages(response.data.chain, 1);

                        // reset pokemon to earliest evolution
                        if (!currentStage) {
                            pokeapi.get(`/pokemon/${response.data.chain.species.name}`)
                                .then((response) => {
                                    this.setState((prevState) => ({
                                        data: {
                                            ...prevState.data,
                                            sprites: response.data.sprites,
                                            name: response.data.name
                                        }
                                    }));
                                    
                                    const pokemon = {
                                        name: this.state.data.name,
                                        currentStage: 1,
                                        stages: this.state.stages + 6, // 1 (egg) + 5 (stars)
                                        sprite: this.state.data.sprites.front_default,
                                        percentage: 0,
                                        percentageValue: null,
                                        id: this.props.pokemon.id,
                                        evolutionChainId: this.state.evolutionChainId,
                                        canEvolve: false,
                                        skill: skill || '',
                                        stars: 0
                                    }

                                    this.props.startAddPokemon(pokemon, this.props.teamId, this.props.index);
                                    this.onCloseModal();
                                });

                        // used to evolve pokemon past stage 1
                        } else {
                            const pokemon = {
                                // name: response.data.chain.species.name,
                                name: data.name,
                                currentStage: (currentStage + 1),
                                stages: this.state.stages + 6, // 1 (egg) + 5 (stars)
                                // sprite: shinyEvolution ? data.sprites.front_shiny : data.sprites.front_default,
                                sprite: data.sprites.front_default,
                                percentage: this.props.pokemon.percentage,
                                percentageValue: null,
                                id: this.props.pokemon.id,
                                evolutionChainId: this.state.evolutionChainId,
                                canEvolve: false,
                                skill: skill || '',
                                stars: stars || 0,
                            }

                            this.props.startAddPokemon(pokemon, this.props.teamId, this.props.index);
                            this.onCloseModal();
                        }         
                    });
            }).catch((error) => {
                this.setState({
                    noSearchResults: true
                });
            })
    }

    deletePokemon = () => {
        this.props.startDeletePokemon(this.props.pokemon.id, this.props.teamId, this.props.index);
        this.setState({ 
            stars: 0
        })
        this.onCloseDeleteModal()
    }

    getEvolutions = () => {
        const { evolutionChainId, currentStage, name, sprite, stars } = this.props.pokemon;
        // search for evolutions

        if (currentStage === 1) {
            this.setState({
                evolutionsArr: [{
                    name,
                    sprite,
                    species: {
                        name
                    }
                }]
            })
        } else {
            pokeapi.get(`/evolution-chain/${evolutionChainId}`)
            .then((response) => {
                this.checkPokemonChain(response.data.chain, name);
                
                // map the array and add sprite property
                if (this.state.evolutionsArr.length > 0) {
                    this.state.evolutionsArr.map(pokemon => {
                        const { name } = pokemon.species;
                        return pokeapi.get(`/pokemon/${name}`)
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
                    // final evolution
                    if (stars === 5) {
                        
                        pokeapi.get(`/pokemon/${name}`)
                            .then((response) => {
                                // for shiny
                                if (response.data.sprites.front_shiny) {
                                    this.setState({
                                        evolutionsArr: [
                                            ...this.state.evolutionsArr,
                                            {
                                                name,
                                                sprite: response.data.sprites.front_shiny,
                                                species: {
                                                    name
                                                },
                                                shiny: true
                                            }
                                        ],
                                        // shinyEvolution: true
                                    })
                                }

                                // for megas & other forms
                                pokeapi.get(`/pokemon-species/${response.data.species.name}`)
                                    .then(response => {
                                        const { varieties } = response.data;
                                        if (varieties.length > 1) {
                                            varieties.forEach(variety => {
                                                pokeapi.get(`/pokemon/${variety.pokemon.name}`)
                                                    .then((response) => {
                                                        console.log(response.data);
                                                        this.setState({
                                                            evolutionsArr: [
                                                                ...this.state.evolutionsArr,
                                                                {
                                                                    name: response.data.name,
                                                                    sprite: response.data.sprites.front_default,
                                                                    species: {
                                                                        name: response.data.name
                                                                    },
                                                                    isDefault: !response.data.is_default
                                                                }
                                                            ]
                                                        });
                                                    })
                                            })
                                        }
                                    })
                            })
                    } else {
                        this.setState({
                            evolutionsArr: [{
                                name,
                                sprite,
                                species: {
                                    name
                                }
                            }],
                            stars: stars + 1
                        });
                    }
                }
            });
        }
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

    evolvePokemon = async (name, shiny, isDefault) => {
        await pokeapi.get(`/pokemon/${name}`)
            .then((response) => {
                const { sprites } = response.data;

                if (shiny) {
                    response.data.sprites.front_default = response.data.sprites.front_shiny;
                }
                // if (name.includes('-mega')) {
                if (isDefault) {
                    this.setState({ mega: true })
                }

                this.setState({
                    searchResultSprite: sprites.front_default,
                    query: '',
                    data: response.data,
                    // mega: name.contains('mega')
                })
            }).catch((error) => {
                
            })

        this.addPokemon();
        this.onCloseEvolveModal();
    }


    render() {
        const { sprite, name, canEvolve, currentStage } = this.props.pokemon;
        const { open, searchResultSprite, noSearchResults, query, openDelete, openEvolve, stars, evolutionsArr } = this.state;

        return (
            <div className="pokemonCard">
                <Modal open={open} onClose={this.onCloseModal} center>
                    <div className="modal__content">
                    {
                        !!name 
                            ? <h1>Please delete current Pokemon</h1>
                            : (
                                <>
                                <form>
                                    <input 
                                        placeholder="Search for a pokemon..."
                                        onChange={(e) => this.handleInputChange(e)}
                                        value={query}
                                    />
                                    <button className="btn" onClick={e => this.searchForPokemon(e)}><FaSearch /></button>
                                </form>
                                <div>
                                    { searchResultSprite && (
                                        <div className="pokemonCard__modal__searchResults">
                                            <img src={searchResultSprite} alt="sprite"/>
                                            <button className="btn" onClick={this.addPokemon}>Add {this.state.data.name}</button>
                                        </div>
                                    )}
                                    { noSearchResults && <h1>Sorry no search results</h1>}
                                </div>
                                </>
                            )
                    }
                    </div>
                </Modal>
                <Modal open={openDelete} onClose={this.onCloseDeleteModal} center>
                    <div className="modal__content">
                        <h1>Are you sure you want to delete?</h1>
                        
                        <div className="modal__content__deleteButtons">
                            <button className="btn" onClick={this.deletePokemon}>Yes</button>
                            <button className="btn" onClick={this.onCloseDeleteModal}>No</button>
                        </div>
                    </div>
                </Modal>
                <Modal open={openEvolve} onClose={this.onCloseEvolveModal} center>
                    <div className="modal__content">
                    <h1>Congrats!</h1>
                    <div className={evolutionsArr.length < 2 ? "" : evolutionsArr.length > 2 ? "pokemonCard__modal__evolutions--three" : "pokemonCard__modal__evolutions--two"}>
                    { this.state.evolutionsArr.map((pokemon, i) => {
                        return (
                            <div key={i}>
                                { pokemon.sprite && (
                                    <div className="pokemonCard__modal__searchResults">
                                    <img src={pokemon.sprite} alt="sprite" />
                                    <div className="pokemonCard__modal__stars">
                                        { Array(stars).fill(true).map((star, i) => <FaStar key={i} />) }
                                    </div>
                                    <button className="btn" onClick={() => this.evolvePokemon(pokemon.species.name, pokemon.shiny, pokemon.isDefault)}>Evolve</button>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    </div>
                    </div>
                </Modal>
                <div className="pokemonCard__icons">
                    <FaTrashAlt onClick={this.onOpenDeleteModal} />
                    { canEvolve && <FaAngleDoubleUp onClick={this.onOpenEvolveModal}/>}
                    <FaPlusSquare onClick={this.onOpenModal} />
                </div>
                {
                    !name 
                        ? (
                            <div className="pokemonCard__egg pokemonCard__egg--empty">
                                <img src={Egg} alt="egg" />
                            </div>
                        ) : currentStage === 1
                            ? ( 
                                <div className="pokemonCard__egg">
                                    <img src={Egg} alt="egg" />
                                </div>
                            ) : <img src={sprite} alt="pokemon sprite" /> 
                }
                <div className="pokemonCard__stars">
                    {
                        this.props.pokemon.stars 
                            ?   Array(this.props.pokemon.stars).fill('star').map((star, i) => {
                                    return <FaStar key={i}/>
                                })
                            : <FaStar style={{opacity: 0}}/>
                        
                    }
                </div>
            </div>
        )
        
    }
}

export default connect(null, { startAddPokemon, startDeletePokemon })(PokemonCard);