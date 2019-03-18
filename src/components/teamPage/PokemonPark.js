import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startUpdateTeamName } from '../../actions';
import Modal from 'react-responsive-modal';
import ScrollAnimation from 'react-animate-on-scroll';

import Card from './Card';


class PokemonPark extends Component {
    state = {
        open: false,
        teamName: ''
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false, teamName: '' });
    };

    handleInputChange = (e) => {
        this.setState({
          teamName: e.target.value
        });
    }

    submitTeamName = () => {
        const { teamName } = this.state;
        if (teamName.length > 0) {
            this.props.startUpdateTeamName(this.props.team.id, teamName);
        }
        this.onCloseModal();
    }

    render() {
        const teamId = this.props.team.id;
        const { name } = this.props.team;
        const { open, teamName } = this.state;

        return (
            <div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <div className="modal__content">
                        <h1>Update team name</h1>
                        <input 
                            value={teamName}
                            placeholder={name}
                            onChange={(e) => this.handleInputChange(e)}
                        />
                        <button className="btn" onClick={this.submitTeamName}>Save</button>
                    </div>
                </Modal>
                <div className="container pokemonPark">
                    <ScrollAnimation animateIn="fadeIn">
                    <h1 className="heading pokemonPark__heading" onClick={this.onOpenModal}>
                        { name }
                    </h1>
                    <div className="pokemonPark__bg">
                        <div className="pokemonPark__card">
                            {this.props.team.pokemon.map((pokemon, i) => <Card pokemon={pokemon} key={i} teamId={teamId} index={i} />)} 
                        </div>
                    </div>
                    </ScrollAnimation>
                </div>
            </div>
        )
    }
}

export default connect(null, { startUpdateTeamName })(PokemonPark);