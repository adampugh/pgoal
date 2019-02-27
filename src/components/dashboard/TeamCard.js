import React, { Component } from 'react';
import pokeapi from '../../apis/pokeapi';
import { FaPlusSquare, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';


class TeamCard extends Component {


    componentDidMount() {

    }

    render() {
        const { team } = this.props;
        const { name, pokemon} = this.props.team;

        return (
            <div className="container">
                <div className="teamCard">
                    <div className="teamCard__title">
                        <Link to={{pathname: `/team/${name}`, state: { team }}}>
                            <h1>{name}</h1>
                        </Link>
                        <FaTrashAlt onClick={this.props.handleDeleteTeam} />
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