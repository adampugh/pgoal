import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux'; 

import Navbar from '../ui/navbar';
import PokemonPark from './PokemonPark';


class TeamPage extends Component {

    render() {

        if (!this.props.team) {
            return <Redirect to="/dashboard" />
        }

        return (
            <>
                <Navbar />
                <PokemonPark team={this.props.team}/>
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    team: ownProps.location.state ? state.teams.filter(team => ownProps.location.state.team.id === team.id)[0] : null
});

export default connect(mapStateToProps)(TeamPage);
