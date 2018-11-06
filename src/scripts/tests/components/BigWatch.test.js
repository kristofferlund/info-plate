/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import BigWatch from '../../components/BigWatch';
import Store from '../../store';
import timer from '../fakeTimer';

jest.useFakeTimers();

const tick = jest.fn(() => new Date());

describe('<BigWatch />', () => {
	const wrapper = mount(<Router><BigWatch store={Store}/></Router>);
	it('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	it('runs an interval', () => {
		expect(setInterval).toHaveBeenCalledTimes(1);
	});
});

test('renders with a set date in state', () => {
	const component = renderer.create(<BigWatch />);
	const date = new Date();
	const instance = component.getInstance();
	expect(instance.state.date).toBe(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
});

// test('Updates each second', () => {
// 	timer();
//
// 	expect(setInterval).toHaveBeenCalledTimes(1);
// 	expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000)
// });
