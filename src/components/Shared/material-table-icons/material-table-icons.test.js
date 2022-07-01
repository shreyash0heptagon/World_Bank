import React from 'react';
import { shallow } from 'enzyme';
import materialTableIcons from '.material-table-icons';

describe('<materialTableIcons />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<materialTableIcons />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
