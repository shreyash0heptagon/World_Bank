import React from 'react';
import { shallow } from 'enzyme';
import JobDescriptionTags from './job-description-tags';

describe('<JobDescriptionTags />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<JobDescriptionTags />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
