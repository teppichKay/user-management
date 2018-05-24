import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './Header';
import AppBar from 'material-ui/AppBar';

configure({adapter: new Adapter()});

describe('<Header />', () => {
	it('should render one AppbBar', () => {
		const wrapper = shallow(<Header />);
		expect(wrapper.find(AppBar)).toHaveLength(1);
	});
});


