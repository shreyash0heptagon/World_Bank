import React from 'react';
import { shallow } from 'enzyme';
import RegularButtonWhite from './regular-button-white';

describe('<RegularButtonWhite />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<RegularButtonWhite />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
