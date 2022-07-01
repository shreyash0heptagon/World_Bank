import React from 'react';
import { shallow } from 'enzyme';
import dashboard from './dashboard';

describe('<Shortlist-automation/dashboard />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<dashboard />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
