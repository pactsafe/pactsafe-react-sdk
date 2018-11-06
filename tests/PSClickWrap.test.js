import React from 'react'
import {mount} from 'enzyme';
import {PSClickWrap} from '../src';

describe('PSClickWrap', () => {

  it('Renders a ps-clickwrap div', () => {
    let wrapper = mount(<PSClickWrap accessId={"29ea80d9-d386-4cfd-a280-505e802ee732"} signerIDSelector={"email"} groupKey={"example-clickwrap"} displayAll={true} testMode={true} />);
    expect(wrapper.containsMatchingElement(<div class="ps-clickwrap"></div>));
  })

  it('Creates _ps global', () => {
    expect(_ps).toBeDefined();
  })
})
