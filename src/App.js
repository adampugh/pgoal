import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import authReducer from './reducers/auth';
import createHistory from 'history/createBrowserHistory';

import Dashboard from './components/dashboard/Dashboard';
import TeamPage from './components/teamPage/TeamPage';
import HomePage from './components/homePage/HomePage';
import Faq from './components/faq/Faq';
import Page404 from './components/404/404';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    combineReducers({
        team: reducers,
        auth: authReducer
    }), 
    composeEnhancers(applyMiddleware(thunk))
);


export const history = createHistory();

class App extends Component {
    render() {
        return (
            <Provider store={store} >
                <Router history={history}>
                    <div>
                        <Route exact path="/" component={HomePage} />
                        <Route extact path="/faq" component={Faq} />
                        <Route exact path="/dash" component={Dashboard} />
                        <Route exact path="/team/:id" component={TeamPage} />
                        <Route path="/" component={Page404} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
