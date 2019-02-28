import React, { Component } from 'react';
import pokeapi from '../../apis/pokeapi';
import { FaPlusSquare, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';

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
                    <h1>Are you sure you want to delete?</h1>
                    
                    <button className="btn" onClick={this.props.handleDeleteTeam}>Yes</button>
                    <button className="btn" onClick={this.onCloseModal}>No</button>
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
                            ? <img src={pokemon.sprite} key={i} /> 
                            : <div className="teamCard__plus" key={i}><FaPlusSquare /></div>
                        )
                    }
                    </div>
                </div>
            </div>
        );
    };
};


export default (TeamCard);