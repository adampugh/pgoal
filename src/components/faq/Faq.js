import React, { Component } from 'react';

import Navbar from '../ui/navbar';
import Footer from '../ui/footer';


import { startLogin } from '../../actions';
import ScrollAnimation from 'react-animate-on-scroll';

import Google from '../../assets/images/google.png';
import Pikachu from '../../assets/images/pikachu.png';
import Squirtle from '../../assets/images/squirtle.png';
import Mockup from '../../assets/images/mockup.png';
import Dragonite from '../../assets/images/dragonite.png';
import Marill from '../../assets/images/marill.png';
import Team from '../../assets/images/team2.png';
import Evolution from '../../assets/images/evolution.png';
import Banner from '../../assets/images/banner.png';

class Faq extends Component {
    render() {
        return (
            <>
                <Navbar />
                <div className="faq__bg">
                    <div className="homePage__second homePage__second--faq container--small">
                        <div className="homePage__second__panels">
                            <ScrollAnimation animateIn="fadeInLeft">
                                <img src={Dragonite} alt="dragonite" className="img__dragonite"/>
                            </ScrollAnimation>
                            <div className="homePage__second__panels__text">
                                <ScrollAnimation animateIn="fadeIn">
                                    <h1 className="heading">Which pokémon generations are available?</h1>
                                    <p>All generations included in the pokéapi can be found on the pokéskills. You can find the pokéapi documentation here.</p>
                                    <img src={Team} alt="team" />
                                </ScrollAnimation>
                            </div>
                            <div className="homePage__second__panels__text panel">
                                <ScrollAnimation animateIn="fadeIn">
                                    <h1 className="heading">Are all pokémon available?</h1>
                                    <p>All pokémon available on the pokéapi can be found on pokéskills. Some pokemon may fall under different names for different forms, for example the pokémon Giratina can be found by searching for 'giratina-altered'.</p>
                                    <img src={Evolution} alt="evolution" />
                                </ScrollAnimation>
                            </div>
                            <ScrollAnimation animateIn="fadeInRight">
                                <img src={Marill} alt="marill" className="img__marill" />
                            </ScrollAnimation>
                            <ScrollAnimation animateIn="fadeInRight">
                                <img src={Marill} alt="marill" className="img__marill" />
                            </ScrollAnimation>
                            <div className="homePage__second__panels__text panel">
                                <ScrollAnimation animateIn="fadeIn">
                                    <h1 className="heading">How do stages work?</h1>
                                    <p>Each pokémon has between 7 and 9 stages depending on the number of evolutions the pokémon has. Pokémon start as an egg and continue through normal evolutions. At the maximum stage pokémon can collect up to five stars.</p>
                                    <img src={Evolution} alt="evolution" />
                                </ScrollAnimation>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default Faq;














{/* <div className="content">
                    <div className="Faq__bg">
                    {/* <div className="container"> */}
                    // <div className="Faq__block container--small">
                    //     <h1 className="heading">Which pokémon generations are available?</h1>
                    //     <p>All generations included in the pokéapi can be found on the pokéskills. You can find the pokéapi documentation here.</p>
                    //     <h1 className="heading">Are all pokémon available?</h1>
                    //     <p>All pokémon available on the pokéapi can be found on pokéskills. Some pokemon may fall under different names for different forms, for example the pokémon Giratina can be found by searching for 'giratina-altered'.</p>
                    //     <h1 className="heading">How do stages work?</h1>
                    //     <p>Each pokémon has between 7 and 9 stages depending on the number of evolutions the pokémon has. Pokémon start as an egg and continue through normal evolutions. At the maximum stage pokémon can collect up to five stars.</p>
                    // </div>
                    {/* </div> */}
                //     </div>
                // </div> */}