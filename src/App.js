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

export const store = createStore(reducers, applyMiddleware(thunk));
export const history = createHistory();

class App extends Component {
    render() {
        return (
            <Provider store={store} >
                <Router history={history}>
                    <div>
                        {/* <Route exact path="/" component={HomePage} /> */}
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/team/:id" component={TeamPage} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
