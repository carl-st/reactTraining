import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './app';
import MainScene from './scenes/Main/';
import { Result } from './components/Result/'

ReactDOM.render(
    <App>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={MainScene} />
            </Route>
            <Route path='/result' component={Result} />
        </Router>
    </App>, document.getElementById('app'));
