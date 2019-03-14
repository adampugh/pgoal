import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux'; 

import Navbar from '../ui/navbar';
import PokemonPark from './PokemonPark';


class TeamPage extends Component {

    componentDidMount() {
        console.log('props', this.props);
    }

    render() {

        if (!!this.props.team === false) {
            return <Redirect to="/" />
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
    // uid: !!state.uid,
    team: ownProps.location.state ? state.team.teams.filter(team => ownProps.location.state.team.id === team.id)[0] : null,
});

export default connect(mapStateToProps)(TeamPage);
