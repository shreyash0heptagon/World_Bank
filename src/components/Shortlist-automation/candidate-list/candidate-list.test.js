import React from 'react';
import { shallow } from 'enzyme';
import CandidateList from './candidate-list';

describe('<CandidateList />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CandidateList />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
