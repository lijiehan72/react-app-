import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ax from './ax';
import Home from "./page/home"

import './index.css';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/home" component={Home} />
        </div>
    </Router>,
  document.getElementById('root')
);



serviceWorker.unregister();
