import React from 'react';
import ReactDOM from 'react-dom';
import App, { history, store } from './App';
import 'normalize.css';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';
import { startFetchTeams, login, logout } from './actions';


let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(<App />, document.querySelector('#root'));
        hasRendered = true;
    }
};

ReactDOM.render(<p>Loading...</p>, document.querySelector('#root'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user.uid);
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