import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCreateTeam, startDeleteTeam } from '../../actions';
import ScrollAnimation from 'react-animate-on-scroll';
import Modal from 'react-responsive-modal';
import { Line } from 'rc-progress';

import Navbar from '../ui/navbar';
import Footer from '../ui/footer';
import TeamCard from './TeamCard';

import Pikachu from '../../assets/images/pikachu.png';
import Eevee from '../../assets/images/eevee.png';
import Gengar from '../../assets/images/gengar.png';
import Umbreon from '../../assets/images/umbreon.png';
import Jigglypuff from '../../assets/images/jigglypuff.png';
import Marill from '../../assets/images/marill.png';
import Squirtle from '../../assets/images/squirtle.png';
import Oddish from '../../assets/images/oddish.png';
import Bulbasaur from '../../assets/images/bulbasaur.png';

const images = { Pikachu, Eevee, Gengar, Umbreon, Jigglypuff, Marill, Squirtle, Oddish, Bulbasaur }

const getProgress = (team) => {
    let total = 0;
    team.pokemon.map(pokemon => {
        total += pokemon.percentage;
    });
    return total / 6;
}

class Dashboard extends Component {
    state = {
        open: false,
        mascotName: null,
        teamProgress: {}
    }

    componentDidMount() {
        const mascotName = window.localStorage.getItem('mascotName');
        this.setState({ mascotName });
        let teamProgress = {};
        this.props.teams.map(team => {
            teamProgress[team.name] = getProgress(team);
        });
        this.setState({ teamProgress });
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false });
    };

    handleStartCreateTeam = () => {
        this.props.startCreateTeam();
    }

    handleDeleteTeam = (id) => {
        this.props.startDeleteTeam(id);
    }

    pickPokemon = (name) => {
        window.localStorage.setItem('mascotName', name);
        this.setState({ mascotName: name });
        this.onCloseModal();
    }
    
    render() {
        const { open, mascotName } = this.state;
        const pokemonPicture =  mascotName ? images[mascotName] : Pikachu;
        

        return (
            <>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <div className="modal__content">
                        <h1>Select a Pokemon</h1>
                        <div className="Dash__modal">
                            <img src={Pikachu} alt="pikachu" onClick={() => this.pickPokemon('Pikachu')} />
                            <img src={Eevee} alt="eevee" onClick={() => this.pickPokemon('Eevee')} />
                            <img src={Gengar} alt="gengar" onClick={() => this.pickPokemon('Gengar')} />
                            <img src={Umbreon} alt="umbreon" onClick={() => this.pickPokemon('Umbreon')} />
                            <img src={Jigglypuff} alt="jigglypuff" onClick={() => this.pickPokemon('Jigglypuff')} />
                            <img src={Marill} alt="marill" onClick={() => this.pickPokemon('Marill')} />
                            <img src={Oddish} alt="oddish" onClick={() => this.pickPokemon('Oddish')} />
                            <img src={Squirtle} alt="squirtle" onClick={() => this.pickPokemon('Squirtle')} />
                            <img src={Bulbasaur} alt="bulbasaur" onClick={() => this.pickPokemon('Bulbasaur')} />
                        </div>
                    </div>
                </Modal>
                <Navbar />
                <div className="content">
                    <div className="TeamCard__bg">
                        <div className="TeamCard__block">
                            <div className="TeamCard__block__intro">
                                <ScrollAnimation animateIn="fadeInRight">
                                    <img src={ pokemonPicture } alt="mascot pokemon" className="TeamCard__block__intro__img" onClick={this.onOpenModal} />
                                </ScrollAnimation>
                                <div className="homePage__second__panels__text">
                                    <ScrollAnimation animateIn="fadeIn">
                                        <h1 className="heading">Pokémon Teams</h1>
                                        <p>Click the 'Create Team' button to add a new team and build up your skills!</p>
                                        <div className="TeamCard__block__intro__progress">
                                            {
                                                this.props.teams.map(team => {
                                                    let percentage = Math.round(getProgress(team));
                                                    percentage = isNaN(percentage) ? 0 : percentage;
                                                    return (
                                                    <div key={team.id}>
                                                        <div className="TeamCard__block__intro__progress__bars">
                                                            <h1>{team.name}</h1>
                                                            <p>{`${percentage}%`}</p>
                                                        </div>
                                                        <Line percent={percentage} strokeWidth="4" strokeColor="#D3D3D3" />
                                                    </div>
                                                )})
                                            }
                                        </div>
                                    </ScrollAnimation>
                                </div>
                                
                            </div>
                        {
                            this.props.teams.map(team => 
                                (
                                    <ScrollAnimation animateIn="fadeIn" key={team.id}>
                                    <TeamCard
                                        team={team} 
                                        key={team.id} 
                                        handleDeleteTeam={() => this.handleDeleteTeam(team.id)} 
                                    />
                                    </ScrollAnimation>
                                )
                            )
                        }
                        <ScrollAnimation animateIn="fadeIn">
                            <div className="teamCard teamCard--create">
                                <button onClick={this.handleStartCreateTeam}>Create new team</button> 
                            </div>
                        </ScrollAnimation>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}


const mapToStateToProps = (state) => {
    return {
        teams: state.team.teams
    }
}


export default connect(mapToStateToProps, { startCreateTeam, startDeleteTeam })(Dashboard);
