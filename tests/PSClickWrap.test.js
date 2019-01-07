import React from 'react';
import { mount } from 'enzyme';
import { PSClickWrap } from '../src';

describe('_ps initialization', () => {
  it('Creates _ps runner global', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" signerIdSelector="email" groupKey="example-clickwrap" displayAll testMode />);
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

  it('calls _ps create with dynamic in payload if passed as a prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" signerIdSelector="email" groupKey="example-clickwrap" dynamic renderData={{}} />);
    expect(_ps.mock.calls[0][2].dynamic).toBe(true);
  });

  it('calls _ps with signer id specified in create payload if passed as a prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" />);
    expect(_ps.mock.calls[0][2].signer_id).toBe('test@abc.com');
  });

  it('_ps create passes in test_mode, disable_sending, dynamic, and signer_id as options', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" />);
    expect(_ps.mock.calls[0][2]).toHaveProperty('test_mode');
    expect(_ps.mock.calls[0][2]).toHaveProperty('disable_sending');
    expect(_ps.mock.calls[0][2]).toHaveProperty('dynamic');
    expect(_ps.mock.calls[0][2]).toHaveProperty('signer_id');
  });

  it('calls _ps load with specified group key', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" />);
    expect(_ps.mock.calls[1][0]).toBe('load');
    expect(_ps.mock.calls[1][1]).toBe('example-clickwrap');
  });

  it('calls _ps with options as second parameter if filter is specified, makes sure filter is passed propertly', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" filter="id==12345 and tags==tag1,tag2" signerId="test@abc.com" />);
    expect(_ps.mock.calls[1][0]).toBe('load');
    expect(typeof _ps.mock.calls[1][1]).toBe('object');
    expect(_ps.mock.calls[1][1]).toHaveProperty('filter');
    expect(_ps.mock.calls[1][1].filter).toBe('id==12345 and tags==tag1,tag2');
    expect(_ps.mock.calls[1][1]).toHaveProperty('container_selector');
    expect(_ps.mock.calls[1][1]).toHaveProperty('confirmation_email');
    expect(_ps.mock.calls[1][1]).toHaveProperty('signer_id_selector');
    expect(_ps.mock.calls[1][1]).toHaveProperty('style');
    expect(_ps.mock.calls[1][1]).toHaveProperty('display_all');
    expect(_ps.mock.calls[1][1]).toHaveProperty('render_data');
    expect(_ps.mock.calls[1][1]).toHaveProperty('auto_run');
    expect(_ps.mock.calls[1][1]).toHaveProperty('force_scroll');
  });

  it('calls _ps with options as third parameter if groupKey is specified', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" />);
    expect(_ps.mock.calls[1][0]).toBe('load');
    expect(typeof _ps.mock.calls[1][2]).toBe('object');
    expect(_ps.mock.calls[1][2]).toHaveProperty('filter');
    expect(_ps.mock.calls[1][2]).toHaveProperty('container_selector');
    expect(_ps.mock.calls[1][2]).toHaveProperty('confirmation_email');
    expect(_ps.mock.calls[1][2]).toHaveProperty('signer_id_selector');
    expect(_ps.mock.calls[1][2]).toHaveProperty('style');
    expect(_ps.mock.calls[1][2]).toHaveProperty('display_all');
    expect(_ps.mock.calls[1][2]).toHaveProperty('render_data');
    expect(_ps.mock.calls[1][2]).toHaveProperty('auto_run');
    expect(_ps.mock.calls[1][2]).toHaveProperty('force_scroll');
  });

  it('sets clickwrapStyle properly on payload if passed as a prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" clickWrapStyle="scroll" />);
    expect(_ps.mock.calls[1][2].style).toBe('scroll');
  });

  it('leaves clickwrapStyle to be undefined if not passed prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" />);
    expect(_ps.mock.calls[1][2].style).toBeUndefined();
  });

  it('sets confirmationEmail property to true on payload if passed as a prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" confirmationEmail />);
    expect(_ps.mock.calls[1][2].confirmation_email).toBe(true);
  });

  it('leaves confirmationEmail as undefined if not passed as prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" />);
    expect(_ps.mock.calls[1][2].confirmation_email).toBeUndefined();
  });

  it('sets disableSending to true if passed as a prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" disableSending />);
    expect(_ps.mock.calls[0][2].disable_sending).toBe(true);
  });

  it('defaults disableSending to false if not passed as a prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" />);
    expect(_ps.mock.calls[0][2].disable_sending).toBe(false);
  });

  it('defaults displayAll to true if not passed as a prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" />);
    expect(_ps.mock.calls[1][2].display_all).toBe(true);
  });

  it('sets displayAll to value passed as prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" displayAll={false} />);
    expect(_ps.mock.calls[1][2].display_all).toBe(false);
  });

  it('sets auto_run to true by default if not passing displayImmediately to false', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" />);
    expect(_ps.mock.calls[1][2].auto_run).toBe(true);
  });

  it('sets auto_run to false if passing displayImmediately=false as a prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" displayImmediately={false} />);
    expect(_ps.mock.calls[1][2].auto_run).toBe(false);
  });

  it('sets dynamic to true in create call if passed as a prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" dynamic renderData={{}} />);
    expect(_ps.mock.calls[0][2].dynamic).toBe(true);
  });

  it('defaults to dynamic as false if not passed as a prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" />);
    expect(_ps.mock.calls[0][2].dynamic).toBe(false);
  });

  it('defaults force_scroll to undefined if not passed as a prop', () => {
    mount(<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-clickwrap" signerId="test@abc.com" />);
    expect(_ps.mock.calls[1][2].force_scroll).toBe(undefined);
  });
});
