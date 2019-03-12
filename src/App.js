import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import createHistory from 'history/createBrowserHistory';

import Dashboard from './components/dashboard/Dashboard';
import TeamPage from './components/teamPage/TeamPage';
import HomePage from './components/homePage/HomePage';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

export const store = createStore(reducers, applyMiddleware(thunk));
export const history = createHistory();

class App extends Component {
    render() {
        return (
            <Provider store={store} >
                <Router history={history}>
                    <div>
                        <PublicRoute exact path="/" component={HomePage} />
                        <PrivateRoute exact path="/dash" component={Dashboard} />
                        <PrivateRoute exact path="/team/:id" component={TeamPage} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
