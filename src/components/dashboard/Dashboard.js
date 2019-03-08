import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startCreateTeam, startDeleteTeam } from '../../actions';

import Navbar from '../ui/navbar';
import TeamCard from './TeamCard';


class Dashboard extends Component {

    handleStartCreateTeam = () => {
        this.props.startCreateTeam();
    }

    handleDeleteTeam = (id) => {
        this.props.startDeleteTeam(id);
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
                <button onClick={this.handleStartCreateTeam}>Create new team</button>
            </div>
            </>
        )
    }
}

const mapToStateToProps = (state) => ({
    teams: state.teams
});


export default connect(mapToStateToProps, { startCreateTeam, startDeleteTeam })(Dashboard);
