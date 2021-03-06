import React from 'react';
import ReactDOM from 'react-dom';
import App, { history, store } from './App';
import 'normalize.css';
import "animate.css/animate.min.css";
import './styles/styles.scss';
import { firebase } from './firebase/firebase';
import { startFetchTeams, login, logout } from './actions';

import Loading from './components/ui/loading';


let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(<App />, document.querySelector('#root'));
        hasRendered = true;
    }
};

ReactDOM.render(<Loading />, document.querySelector('#root'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startFetchTeams()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dash')
            }
        });
    } else {
        store.dispatch(logout());
        history.push('/');
        renderApp();
    }
})