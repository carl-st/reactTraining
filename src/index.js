import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './app';
import { MainScene, List } from './scenes/Main/';

ReactDOM.render(
    <App>
        <Router history={browserHistory}>
            <Route path='/list' component={List} />
            <Route path='/' component={MainScene} />
        </Router>
    </App>, document.getElementById('app'));
