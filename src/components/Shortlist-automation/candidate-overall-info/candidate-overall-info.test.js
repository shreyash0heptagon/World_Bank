import React from 'react';
import { shallow } from 'enzyme';
import CandidateOverallInfo from './candidate-overall-info';

describe('<CandidateOverallInfo />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CandidateOverallInfo />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
