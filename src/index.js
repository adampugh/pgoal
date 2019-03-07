import React from 'react';
import ReactDOM from 'react-dom';
import App, { history } from './App';
import 'normalize.css';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';

ReactDOM.render(<App />, document.querySelector('#root'));


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // if someone logs in then fetch data here
        
    } else {
        history.push('/');
    }
})