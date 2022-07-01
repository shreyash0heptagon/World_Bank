import React from 'react';
import { shallow } from 'enzyme';
import DigitalSummary from './digital-summary';

describe('<Shortlist-automation/digital-summary />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DigitalSummary />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
