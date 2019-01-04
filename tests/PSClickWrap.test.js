import React from 'react';
import { mount } from 'enzyme';
import { PSClickWrap } from '../src';

describe('_ps initialization', () => {
  it('Creates _ps runner global', () => {
    const wrapper = mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" signerIdSelector="email" groupKey="example-clickwrap" displayAll testMode />);
    expect(_ps).toBeDefined();
  });
});

describe('PSClickWrap _ps interface tests', () => {
  beforeEach(() => {
    window._ps = jest.fn();
  });

  it('Renders a ps-clickwrap wrapper div', () => {
    const wrapper = mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" signerIdSelector="email" groupKey="example-clickwrap" />);
    expect(wrapper.containsMatchingElement(<div id="ps-clickwrap" />)).toBeTruthy();
  });

  it('Renders a container div with specified container Id if passed as a prop', () => {
    const wrapper = mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" containerId="test" signerIdSelector="email" groupKey="example-clickwrap" />);
    expect(wrapper.containsMatchingElement(<div id="test" />)).toBeTruthy();
  });

  it('calls _ps with create and proper access ID', () => {
    const passedAccessId = '29ea80d9-d386-4cfd-a280-505e802ee732';
    mount(<PSClickWrap accessId={passedAccessId} signerIdSelector="email" groupKey="example-clickwrap" displayAll testMode />);
    expect(_ps.mock.calls[0][0]).toBe('create');
    expect(_ps.mock.calls[0][1]).toBe(passedAccessId);
  });

  it('calls _ps create with test_mode if passed as a prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" signerIdSelector="email" groupKey="example-clickwrap" testMode />);
    expect(_ps.mock.calls[0][2].test_mode).toBe(true);
  });

  it('calls _ps create with disable_sending if passed as a prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" signerIdSelector="email" groupKey="example-clickwrap" disableSending />);
    expect(_ps.mock.calls[0][2].disable_sending).toBe(true);
  });

  it('calls _ps create with dynamic if passed as a prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" signerIdSelector="email" groupKey="example-clickwrap" dynamic renderData={{}} />);
    expect(_ps.mock.calls[0][2].dynamic).toBe(true);
  });

  it('calls _ps with signer id specified if passed as a prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" />);
    expect(_ps.mock.calls[0][2].signer_id).toBe('test@abc.com');
  });

  it('calls _ps load with specified group key', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" />);
    expect(_ps.mock.calls[1][0]).toBe('load');
    expect(_ps.mock.calls[1][1]).toBe('example-clickwrap');
  });

  it('calls _ps with options as second parameter if filter is specified', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" filter="100001" signerId="test@abc.com" />);
    expect(_ps.mock.calls[1][0]).toBe('load');
    expect(typeof _ps.mock.calls[1][1]).toBe('object');
  });
});
