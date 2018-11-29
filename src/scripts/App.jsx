import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
	About,
	Contact,
	Home,
	PageNotFound,
} from './screens';
import { Footer, Header } from './components';

/* The Switch element makes it possible to only
render the routes and its components and not the header and footer */

// When you don't need any functions inside of the component you should render a stateless component (basically just a function)
const App = props => (
	<Router>
		<div className="app">
			<Header theme={props.selectedTheme} />
			<div className={`app-content ${props.selectedTheme}`}>
				<Switch>
					{props.routes.map(route => (
						<Route
							key={route.path}
							path={`/${route.path}`}
							exact
							component={route.component}
						/>
					))}
					<Route path="/" exact component={Home} />
					<Route component={PageNotFound} />
				</Switch>
			</div>
			<footer className={`app-footer ${props.selectedTheme}`}>
				<Footer />
			</footer>
		</div>
	</Router>
);

App.propTypes = {
	routes: PropTypes.array,
	selectedTheme: PropTypes.string,
};

// It is also possible to declare props directly here
const mapStateToProps = state => ({
	routes: [
		{ path: 'about', component: About },
		{ path: 'contact', component: Contact },
	],
	selectedTheme: state.switchTheme ? state.switchTheme.selectedTheme : 'default',
});

/* Because of the connect method from React Redux, the shouldComponentUpdate function causes the component not to update
 * unless the props change. As of version 4 of the router, this conflicts on how it updates on navigating.
 * Wrapping the component in the withRouter function will fix this. */
export default connect(mapStateToProps, null, null)(App);
