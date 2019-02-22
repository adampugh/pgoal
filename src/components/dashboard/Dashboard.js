import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTeam } from '../../actions';

import Navbar from '../ui/navbar';
import TeamCard from './TeamCard';

// each team should be a link to a specific page
// addNewTeam fn + action + reducer
// deleteTeam fn + action + reducer
// setup db - firebase?

class Dashboard extends Component {
    handleCreateTeam = () => {
        // redux action to add new team to reducer
        this.props.createTeam();
    }

    deleteTeam = () => {
        // redux action to delete team
    }
    
    render() {
        return (
            <>
            <Navbar />
            {
                this.props.teams.map((team, i) => <TeamCard  team={team} key={i} />)
            }
            <button onClick={this.handleCreateTeam}>Create new team</button>
            </>
        )
    }
}

const mapToStateToProps = (state) => ({
    teams: state.teams
});


export default connect(mapToStateToProps, { createTeam })(Dashboard);
