import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {PostUser}  from './PostUser';
import { CircularProgress } from 'material-ui/Progress';

configure({adapter: new Adapter()});

describe('<PostUser />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<PostUser />);
        // check the dom tree
       // console.log(wrapper.debug());
    });

    it('render the DUMB component', () => {
       expect(wrapper.length).toEqual(1)
    });


    it('should render a CircularProgress if loading is true', () => {
        wrapper.setProps({loading: true});
        expect(wrapper.contains(<CircularProgress
                    size={100}
                    style={{marginTop: '50px'}}/>)).toEqual(true);
        
    });

 
})