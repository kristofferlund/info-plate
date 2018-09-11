import React from 'react';
import PropTypes from 'prop-types';

const Header = props => (
	<header className={`app-header ${props.theme}`}>
		<h1 className="header-logo">App</h1>
	</header>
);

Header.propTypes = {
	theme: PropTypes.string,
};

export default Header;
