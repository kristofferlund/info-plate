import React from 'react';
import { mount } from 'enzyme';
import { shallow } from 'enzyme';
import Footer from '../../components/Footer';
import Store from '../../store'

describe('<Footer />', () => {
	const wrapper = mount(<Footer store={Store}/>);
	it('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	it('initiates with default theme', () => {
		expect(Store.getState().switchTheme.selectedTheme).toBe('default');
	});
	it('can change theme', () => {
		const summerButton = wrapper.find('#theme-mirror');
		summerButton.simulate('click');
		expect(Store.getState().switchTheme.selectedTheme).toBe('mirror');
	});
});

test('renders with a default theme', () => {
	const component = shallow(<Footer store={Store} />);
	expect(component.instance().selector.props.selectedTheme).toBe('mirror');
});
