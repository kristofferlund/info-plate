import React from 'react';
import { shallow } from 'enzyme';
import BigWatch from '../../components/BigWatch';

describe('<BigWatch />', () => {
	let wrapper;
	it('renders without crashing', () => {
		wrapper = shallow(<BigWatch />);
		expect(wrapper).toBeDefined();
	});
	it('runs an interval on mount', () => {
		jest.useFakeTimers();
		wrapper = shallow(<BigWatch />);
		expect(setInterval).toHaveBeenCalledTimes(1);
	});
	it('clears interval on unmount', () => {
		jest.useFakeTimers();
		wrapper = shallow(<BigWatch />);
		wrapper.unmount();
		expect(clearInterval.mock.calls.length).toEqual(1);
	});
	it('updates state every second', () => {
		jest.useFakeTimers();
		wrapper = shallow(<BigWatch />);
		// TODO: Finish this
	})
});
