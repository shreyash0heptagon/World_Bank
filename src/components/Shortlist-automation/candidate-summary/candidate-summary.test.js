import React from 'react';
import { shallow } from 'enzyme';
import CandidateSummary from './digital-summary';

describe('<CandidateSummary />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CandidateSummary />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
