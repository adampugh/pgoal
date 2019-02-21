import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from '../ui/navbar';
import TeamCard from './TeamCard';

// each team should be a link to a specific page
// addNewTeam fn + action + reducer
// deleteTeam fn + action + reducer
// setup db - firebase?

class Dashboard extends Component {
    addNewTeam = () => {
        // redux action to add new team to reducer
    }

    deleteTeam = () => {
        // redux action to delete team
    }
    
    render() {
        return (
            <>
            <Navbar />
            {
                this.props.teams.map(team => <TeamCard  team={team}/>)
            }
            </>
        )
    }
}

const mapToStateToProps = (state) => ({
    teams: state.teams
});


export default connect(mapToStateToProps)(Dashboard);
