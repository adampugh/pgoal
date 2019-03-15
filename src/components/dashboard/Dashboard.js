import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCreateTeam, startDeleteTeam } from '../../actions';
import Navbar from '../ui/navbar';
import Footer from '../ui/footer';
import TeamCard from './TeamCard';


class Dashboard extends Component {

    handleStartCreateTeam = () => {
        this.props.startCreateTeam();
    }

    handleDeleteTeam = (id) => {
        this.props.startDeleteTeam(id);
    }
    
    render() {
        // if (this.props.uid === false) {
        //     return <Redirect to="/" />
        // }


        return (
            // <div className="page">
            <>
            <Navbar />
            <div className="content">
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
            </div>
            <Footer />
            </>
        )
    }
}


const mapToStateToProps = (state) => {
    return {
        teams: state.team.teams,
        // uid: !!state.uid
    }
}


export default connect(mapToStateToProps, { startCreateTeam, startDeleteTeam })(Dashboard);
