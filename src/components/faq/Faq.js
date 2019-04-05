import React, { Component } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

import Navbar from '../ui/navbar';
import Footer from '../ui/footer';

import Giratina from '../../assets/images/giratina.png';
import Mew from '../../assets/images/mew.png';
import Raichu from '../../assets/images/raichu.png';

class Faq extends Component {
    render() {
        return (
            <>
                <Navbar />
                <div className="faq__bg">
                    <div className="homePage__second homePage__second--faq container--small">
                        <div className="homePage__second__panels">
                            <ScrollAnimation animateIn="fadeInRight">
                                <img src={Mew} alt="mew" className="img__mew"/>
                            </ScrollAnimation>
                            <div className="homePage__second__panels__text">
                                <ScrollAnimation animateIn="fadeIn">
                                    <h1 className="heading">Which pokémon generations are available?</h1>
                                    <p>All generations included in the pokéapi can be found on the pokéskills. You can find the pokéapi documentation here.</p>
                                </ScrollAnimation>
                            </div>
                            <div className="homePage__second__panels__text panel">
                                <ScrollAnimation animateIn="fadeIn">
                                    <h1 className="heading">Are all pokémon available?</h1>
                                    <p>All pokémon available on the pokéapi can be found on pokéskills. Some pokemon may fall under different names for different forms, for example the pokémon Giratina can be found by searching for 'giratina-altered'.</p>
                                </ScrollAnimation>
                            </div>
                            <ScrollAnimation animateIn="fadeInLeft">
                                <img src={Giratina} alt="giratina" className="img__giratina" />
                            </ScrollAnimation>
                            <ScrollAnimation animateIn="fadeInRight">
                                <img src={Raichu} alt="raichu" className="img__raichu" />
                            </ScrollAnimation>
                            <div className="homePage__second__panels__text panel">
                                <ScrollAnimation animateIn="fadeIn">
                                    <h1 className="heading">How do stages work?</h1>
                                    <p>Each pokémon has between 7 and 9 stages depending on the number of evolutions the pokémon has. Pokémon start as an egg and continue through normal evolutions. At the maximum stage pokémon can collect up to five stars.</p>
                                </ScrollAnimation>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer additionalClasses="footer--faq" />
            </>
        )
    }
}

export default Faq;
