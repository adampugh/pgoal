import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import Dashboard from './components/dashboard/Dashboard';
import TeamPage from './components/teamPage/TeamPage';


const store= createStore(reducers, applyMiddleware(thunk));

class App extends Component {
    render() {
        return (
            <Provider store={store} >
                {/* <Dashboard /> */}
                <TeamPage />
            </Provider>
        );
    }
}

export default App;
