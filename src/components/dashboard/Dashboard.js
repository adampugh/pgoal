import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTeam, deleteTeam } from '../../actions';

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

    handleDeleteTeam = (id) => {
        // redux action to delete team
        // this.props.deleteTeam();
        
        this.props.deleteTeam(id);
    }
    
    render() {
        return (
            <>
            <Navbar />
            {
                this.props.teams.map(team => <TeamCard
                    team={team} 
                    key={team.id} 
                    handleDeleteTeam={() => this.handleDeleteTeam(team.id)}/>)
            }
            <button onClick={this.handleCreateTeam}>Create new team</button>
            </>
        )
    }
}

const mapToStateToProps = (state) => ({
    teams: state.teams
});


export default connect(mapToStateToProps, { createTeam, deleteTeam })(Dashboard);
