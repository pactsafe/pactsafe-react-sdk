import React from 'react';
import { mount } from 'enzyme';
import { PSClickWrap } from '../src';

describe('PSClickWrap', () => {
  it('Renders a ps-clickwrap div', () => {
    const wrapper = mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" signerIDSelector="email" groupKey="example-clickwrap" displayAll testMode />);
    expect(wrapper.containsMatchingElement(<div className="ps-clickwrap" />));
    console.log(wrapper.debug());
  });

  it('Creates _ps global', () => {
    expect(_ps).toBeDefined();
  });

  it('should inject the snippet to the page', () => {
    const wrapper = mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" signerIDSelector="email" groupKey="example-clickwrap" displayAll testMode />);
    wrapper.instance().injectSnippet = jest.fn(() => {
      console.log('hi there');
    });
    wrapper.instance().forceUpdate();

    expect(wrapper.instance().injectSnippet).toBeCalled();
  });
});
