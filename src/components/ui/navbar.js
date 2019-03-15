import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogin, startLogout } from '../../actions';

import Logo from '../../assets/images/logo.png'
import Google from '../../assets/images/google.png'

class Navbar extends Component {
    render() {
        const { uid } = this.props;

        return (
            <nav>
                <div className="container navbar">
                
                <Link to={ uid ? "/dash" : "/" }>
                    <div className="logo">
                        <img src={Logo} alt="logo" />
                    </div>
                </Link>
                <div className="navbar__buttons">
                    <Link to="/faq" className="navbar__buttons__faq">
                        FAQ
                    </Link>
                    {
                        uid ? (
                            <button 
                                onClick={this.props.startLogout}
                                className="btn">
                                Logout
                            </button>
                        ) : (
                            <button 
                                onClick={this.props.startLogin}
                                className="btn"
                                >Login <img src={Google} alt="google logo" />
                            </button>
                        )
                    }
                </div>
                </div>
            </nav>
        )
    }
}

const mapToStateToProps = (state) => ({
    uid: !!state.auth.uid
})

export default connect(mapToStateToProps, { startLogin, startLogout })(Navbar);