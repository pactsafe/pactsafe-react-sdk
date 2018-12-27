import React from 'react';
import { mount } from 'enzyme';
import { PSClickWrap } from '../src';

describe('PSClickWrap', () => {
  it('Renders a ps-clickwrap wrapper div', () => {
    const wrapper = mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" signerIdSelector="email" groupKey="example-clickwrap" displayAll testMode />);
    expect(wrapper.containsMatchingElement(<div id="ps-clickwrap" />)).toBeTruthy();
  });

  it('Renders a container div with specified id', () => {
    const wrapper = mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" containerId="test" signerIdSelector="email" groupKey="example-clickwrap" displayAll testMode />);
    expect(wrapper.containsMatchingElement(<div id="test" />)).toBeTruthy();
  });

  it('Creates _ps runner global', () => {
    const wrapper = mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" signerIdSelector="email" groupKey="example-clickwrap" displayAll testMode />);
    expect(_ps).toBeDefined();
    // expect(_ps).toBeCalled();
  });
});
