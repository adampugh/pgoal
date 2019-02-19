import React, { Component } from 'react';

import Logo from '../../assets/images/logo.png'

class Navbar extends Component {
    render() {
        return (
            <nav className="container">
                <div className="logo">
                    <img src={Logo} alt="logo" />
                </div>
                <div className="navbar__buttons">
                    <button className="btn">Login</button>
                </div>
            </nav>
        )
    }
}

export default Navbar;