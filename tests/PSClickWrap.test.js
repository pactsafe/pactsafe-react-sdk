import React from 'react'
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter() });
import {render, unmountComponentAtNode} from 'react-dom'

import {PSClickWrap} from '../src';

describe('PSClickWrap', () => {
  // let node

  // beforeEach(() => {
  //   node = document.createElement('div')
  // })

  // afterEach(() => {
  //   unmountComponentAtNode(node)
  // })

  it('Renders a ps-group div', () => {
    let wrapper = mount(<PSClickWrap accessId={"29ea80d9-d386-4cfd-a280-505e802ee732"} signerIDSelector={"email"} groupKey={"example-clickwrap"} displayAll={true} testMode={true} />);
    expect(wrapper.containsMatchingElement(<div class="ps-contract"></div>));
  })

  it('Renders a contract body', () => {
    let wrapper = mount(<PSClickWrap accessId={"29ea80d9-d386-4cfd-a280-505e802ee732"} signerIDSelector={"email"} groupKey={"example-clickwrap"} displayAll={true} testMode={true} />);
    expect(wrapper.containsMatchingElement(<div class="ps-contract-body"></div>));
  })
})
