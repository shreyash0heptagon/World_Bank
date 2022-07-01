import React from 'react';
import { shallow } from 'enzyme';
import JobRoleInfo from './job-role-info';

describe('<job-role-info />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<JobRoleInfo />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
