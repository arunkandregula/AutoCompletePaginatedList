
import React from 'react';
import {Router, Route, Link, browserHistory, hashHistory } from 'react-router';
import Home from './components/Home/Home';
import ProviderSearch from './components/ProviderSearch/ProviderSearch';


const App = () => ( <Router history={hashHistory}>
		<Route path="/" component={Home} />
		<Route path="/s" component={ProviderSearch} />
	</Router>
);

export default App;
