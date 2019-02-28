import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/logo.png'

class Navbar extends Component {
    render() {
        return (
            <nav className="container">
                <Link to="/">
                    <div className="logo">
                        <img src={Logo} alt="logo" />
                    </div>
                </Link>
                <div className="navbar__buttons">
                    <button className="btn">Login</button>
                </div>
            </nav>
        )
    }
}

export default Navbar;