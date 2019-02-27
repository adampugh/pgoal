import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/team/:id" component={TeamPage} />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
