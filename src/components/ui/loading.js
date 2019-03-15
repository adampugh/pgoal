import React from 'react';
import PikachuLoading from '../../assets/images/pikachuloading.gif';

const Loading = () => (
    <div className="loadingPage">
        <div>
            <img src={PikachuLoading} alt="pikachu loading animation" />
            <p>Loading...</p>
        </div>
    </div>
);

export default Loading;