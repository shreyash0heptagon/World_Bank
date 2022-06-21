import React from 'react';
import { shallow } from 'enzyme';
import RegularInput from './regular-input';

describe('<RegularInput />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<RegularInput />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
