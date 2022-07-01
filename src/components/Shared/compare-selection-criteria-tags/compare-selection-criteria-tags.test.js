import React from 'react';
import { shallow } from 'enzyme';
import SelectionCriteriaTags from './Shared/compare-selection-criteria-tags';

describe('<Shared/CompareSelectionCriteriaTags />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CompareSelectionCriteriaTags />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
