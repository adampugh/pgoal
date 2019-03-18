import React from 'react';
import PikachuLoading from '../../assets/images/pikachuloading.gif';
import Logo from '../../assets/images/logo.png';

const Loading = () => (
    <div className="loadingPage">
        <div>
            <img src={Logo} alt="logo" className="loadingPage__logo" />
            <img src={PikachuLoading} alt="pikachu loading animation" className="loadingPage__pikachu" />
            <p>Loading...</p>
        </div>
    </div>
);

export default Loading;