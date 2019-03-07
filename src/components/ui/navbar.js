import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogin, startLogout } from '../../actions';

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
                    <button 
                        onClick={this.props.startLogin}
                        className="btn"
                        >Login</button>
                    <button 
                        onClick={this.props.startLogout}
                        className="btn">
                        Logout
                    </button>
                </div>
            </nav>
        )
    }
}

export default connect(null, { startLogin, startLogout })(Navbar);