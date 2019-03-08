import React from 'react';
import ReactDOM from 'react-dom';
import App, { history, store } from './App';
import 'normalize.css';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';
import { startFetchTeams } from './actions';




ReactDOM.render(<p>Loading...</p>, document.querySelector('#root'));

store.dispatch(startFetchTeams()).then(() => {
    ReactDOM.render(<App />, document.querySelector('#root'));
});









firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // if someone logs in then fetch data here
        
    } else {
        // history.push('/');
    }
})