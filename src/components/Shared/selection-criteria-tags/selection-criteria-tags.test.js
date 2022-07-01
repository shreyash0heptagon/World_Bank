import React from 'react';
import { shallow } from 'enzyme';
import SelectionCriteriaTags from './Shared/selection-criteria-tags';

describe('<Shared/selection-criteria-tags />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SelectionCriteriaTags />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
