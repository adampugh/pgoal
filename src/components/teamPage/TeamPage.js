import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux'; 

import Navbar from '../ui/navbar';
import Footer from '../ui/footer';
import PokemonPark from './PokemonPark';


class TeamPage extends Component {

    render() {

        if (!!this.props.team === false) {
            return <Redirect to="/" />
        }

        return (
            <>
                <Navbar />
                <div className="content">
                    <div className="TeamPage__bg">
                        <div className="TeamPage__pokemonPark">
                            <PokemonPark team={this.props.team}/>
                        </div>
                    </div>
                </div>
                <Footer additionalClasses="footer--faq" />
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    team: ownProps.location.state ? state.team.teams.filter(team => ownProps.location.state.team.id === team.id)[0] : null,
});

export default connect(mapStateToProps)(TeamPage);
