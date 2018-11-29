import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import App from '../App';

describe('<App />', () => {
	// Random data in expected format
	const initialState = {
		routes: [{path: 'afpd', component: 'gnagnj'}, {path: '234', component: 'sng'}],
	};
	// If the component is used with the Redux connect method it expects a store.
	// The store can be mocked with the configureStore function.
	const mockStore = configureStore();
	let store, wrapper;
	it('renders without crashing', () => {
		// Mount the store with the data needed
		store = mockStore(initialState);
		/* Shallow rendering renders the component as a unit, to ensure that your tests
		* are not indirectly asserting on behaviour of child components */
		wrapper = shallow(<App store={store} />).dive();
		expect(wrapper).toBeDefined();
	});
	it('only renders single instance', () => {
		store = mockStore(initialState);
		wrapper = shallow(<App store={store} />);
		expect(wrapper).toHaveLength(1);
	});
	it('have a html wrapper element', () => {
		store = mockStore(initialState);
		wrapper = shallow(<App store={store} />);
		expect(wrapper.find('.app')).toBeDefined();
	});
	it('renders child elements', () => {
		store = mockStore(initialState);
		wrapper = shallow(<App store={store} />);
		expect(wrapper.dive().find('Header')).toBeTruthy();
	});
	it('sets injected routes to props', () => {
		store = mockStore(initialState);
		wrapper = shallow((
			<App store={store} />
		));
		expect(wrapper.props().routes.length).toBe(2);
	});
	it('renders 2 default routes in addition to injected routes', () => {
		store = mockStore(initialState);
		wrapper = shallow(<App store={store} />);
		/* If you want some of this child elements, you can use the `dive()` function.
		 * It renders a non-DOM child of the current wrapper */
		expect(wrapper.dive().find('Switch').children().find('Route').getElements().length)
			.toEqual(store.getState().routes.length + 2);
	});

	// TODO: Add test for selected theme
});
