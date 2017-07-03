import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import MainScene from './scenes/Main/';
import VideosScene from './scenes/Videos/';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

const BasicExample = () => (
    <Router>
        <div>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/videos'>About</Link></li>
            </ul>

            <hr />

            <Route
                component={MainScene}
                exact path='/'
            />
            <Route
                component={VideosScene}
                exact path='/videos'
            />
        </div>
    </Router>
)


ReactDOM.render(<BasicExample />, document.getElementById('app'));
