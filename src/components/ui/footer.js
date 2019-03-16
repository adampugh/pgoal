import React from 'react';
import { FaStar, FaGithub, FaTwitter } from 'react-icons/fa';

import Logo from '../../assets/images/logo.png'

const Footer = (props) => (
    // <footer>
    <div className={`footer ${props.additionalClasses}`}>
        <img src={Logo} alt="logo" />
        <div className="footer__links">
            <a href="https://github.com/adampugh/pgoal" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://github.com/adampugh/pgoal/stargazers" target="_blank" rel="noopener noreferrer"><FaStar /></a>
            <a href="https://github.com/adampugh/pgoal" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        </div>
    </div>
    
);

export default Footer;