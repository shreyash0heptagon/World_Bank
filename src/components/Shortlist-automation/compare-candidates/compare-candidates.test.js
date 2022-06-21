import React from 'react';
import { shallow } from 'enzyme';
import Shortlist-automation/compare-candidates from './Shortlist-automation/compare-candidates';

describe('<Shortlist-automation/compare-candidates />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Shortlist-automation/compare-candidates />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
