import React from 'react';
import { shallow } from 'enzyme';
import header from './header';

describe('<Shared/header />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<header />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
