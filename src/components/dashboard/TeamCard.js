import React, { Component } from 'react';
import { FaPlusSquare, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';

import Egg from '../../assets/images/egg.png';

class TeamCard extends Component {
    state = {
        open: false
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        const { team } = this.props;
        const { name, pokemon} = this.props.team;

        return (
            <div className="container">
                <Modal open={open} onClose={this.onCloseModal} center>
                    <div className="modal__content">
                        <h1>Are you sure you want to delete?</h1>
                        <div className="modal__content__deleteButtons">
                            <button className="btn" onClick={this.props.handleDeleteTeam}>Yes</button>
                            <button className="btn" onClick={this.onCloseModal}>No</button>
                        </div>
                    </div>
                </Modal>
                <div className="teamCard">
                    <div className="teamCard__title">
                        <Link to={{pathname: `/team/${name}`, state: { team }}}>
                            <h1>{name}</h1>
                        </Link>
                        <FaTrashAlt onClick={this.onOpenModal} />
                    </div>
                    <div className="teamCard__pokemon">
                    {
                        pokemon.map((pokemon, i) => pokemon.sprite 
                            ? pokemon.currentStage === 1 
                                ? <img src={Egg} alt="egg" key={i} className="teamCard__pokemon__egg" /> 
                                : <img src={pokemon.sprite} key={i} alt="sprite"/> 
                            : <div className="teamCard__plus" key={i}><FaPlusSquare /></div>
                        )
                    }
                    </div>
                </div>
            </div>
        );
    };
};


export default TeamCard;