import React, { Component } from 'react';

import Navbar from '../ui/navbar';
import Footer from '../ui/footer';
import Google from '../../assets/images/google.png';
import Pikachu from '../../assets/images/pikachu.png';
import Squirtle from '../../assets/images/squirtle.png';
import Mockup from '../../assets/images/mockup.png';
import Dragonite from '../../assets/images/dragonite.png';
import Marill from '../../assets/images/marill.png';
import Team from '../../assets/images/team2.png';
import Evolution from '../../assets/images/evolution.png';
import Banner from '../../assets/images/banner.png';

class HomePage extends Component {
    render() {
        return (
            <>
                <Navbar />
                <div className="homePage__hero">
                    <div className="container homePage__hero__container">
                        <div className="homePage__hero__block">
                            <h1 className="heading">Evolve Your Skills!</h1>
                            <div className="homePage__hero__block__panels__text">
                                <p>Gamify your progress by creating pokemon teams and watch them develop as you do!</p>
                                <button className="btn">
                                    Login <img src={Google} alt="google logo" />
                                </button>
                            </div>
                            <div className="homePage__hero__block__panels">
                                <img src={Pikachu} alt="pikachu" className="homePage__hero__block__panels__img--pikachu"/>
                                {/* <img src={Mockup} alt="app mockup" className="homePage__hero__block__panels__img--mockup"/> */}
                                <div></div>
                                <img src={Squirtle} alt="squirtle" className="homePage__hero__block__panels__img--squirtle"/>
                            </div>
                        </div>
                    </div>
                    <div className="homePage__hero__overlay"></div>
                </div>
                <div className="homePage__second__bg">
                {/* <div className="container"> */}
                <div className="homePage__second container--small">
                    <div className="homePage__second__panels">
                        <img src={Dragonite} alt="dragonite" className="img__dragonite"/>
                        <div className="homePage__second__panels__text">
                            <h1 className="heading">Build Teams</h1>
                            <p>Create teams of pokemon to show your progress in different skills. Name teams for each of your goals, whether it's learning a new language or a simple to do list PokeSkills has got you covered.</p>
                            <img src={Team} alt="team" />
                        </div>
                        <div className="homePage__second__panels__text panel">
                            <h1 className="heading">Evolve Pokemon</h1>
                            <p>Evolve your pokemon as your skills develop, each pokemon has up to 9 stages of development. As your skills grow so do your pokemon!</p>
                            <img src={Evolution} alt="evolution" />
                        </div>
                        <img src={Marill} alt="marill" className="img__marill" />
                    </div>
                    <img src={Banner} alt="pokemon banner" className="img__banner" />
                </div>
                {/* </div> */}
                <Footer />
                </div>
                
            </>
        )
    }
}

export default HomePage;