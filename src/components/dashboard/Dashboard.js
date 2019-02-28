import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createTeam, deleteTeam } from '../../actions';

import Navbar from '../ui/navbar';
import TeamCard from './TeamCard';


class Dashboard extends Component {

    handleCreateTeam = () => {
        this.props.createTeam();
    }

    handleDeleteTeam = (id) => {
        this.props.deleteTeam(id);
    }
    
    render() {
        return (
            <>
            <Navbar />
            {
                this.props.teams.map(team => 
                    (
                        <TeamCard
                            team={team} 
                            key={team.id} 
                            handleDeleteTeam={() => this.handleDeleteTeam(team.id)} 
                        />
                   )
                )
            }
            <div className="teamCard teamCard--create">
                <button onClick={this.handleCreateTeam}>Create new team</button>
            </div>
            </>
        )
    }
}

const mapToStateToProps = (state) => ({
    teams: state.teams
});


export default connect(mapToStateToProps, { createTeam, deleteTeam })(Dashboard);
