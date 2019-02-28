import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux'; 

import Navbar from '../ui/navbar';
import PokemonPark from './PokemonPark';


class TeamPage extends Component {
    state = {
        redirect: false
    }

    componentDidMount() {
        // if link doesn't come from homepage redirect
        if (!this.props.team) {
            this.setState({
                redirect: true
            })
        }
    }

    render() {
        const { redirect } = this.state;
        // const { team } = this.props.location.state;
        
        
        if (redirect) {
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
    team: ownProps.location.state ? state.teams.filter(team => ownProps.location.state.team.id === team.id)[0] : null
});

export default connect(mapStateToProps)(TeamPage);
