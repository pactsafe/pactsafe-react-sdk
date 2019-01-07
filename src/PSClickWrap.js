/* global _ps */
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredIf from 'react-proptype-conditional-require';
import uuid from 'uuid/v4';
import PSSnippet from './PSSnippet';

class PSClickWrap extends React.Component {
  constructor(props) {
    super(props);
    this.createClickWrap = this.createClickWrap.bind(this);
    this.state = {
      clickwrapGroupKey: null,
      dynamicGroup: false,
    };
    this.propsEventMap = {
      onAll: 'all',
      onSent: 'sent',
      onRetrieved: 'retrieved',
      onSet: 'set',
      onSetSignerId: 'set:signer_id',
      onValid: 'valid',
      onInvalid: 'invalid',
      onRendered: 'rendered',
      onDisplayed: 'displayed',
      onScrolledContract: 'scrolled:contract',
      onScrolled: 'scrolled',
      onError: 'error',
    };
    const { psScriptUrl, backupScriptURL, accessId, testMode, disableSending, dynamic, signerId, debug } = this.props;
    if (!PSSnippet.isSnippetLoaded(psScriptUrl, backupScriptURL)) {
      PSSnippet.injectSnippet(psScriptUrl, backupScriptURL);
    }
    _ps('create', accessId, {
      test_mode: testMode,
      disable_sending: disableSending,
      dynamic,
      signer_id: signerId,
    });
    if (debug) {
      _ps.debug = true;
    }
  }

  componentDidMount() {
    this.createClickWrap();
  }

  componentDidUpdate(prevProps) {
    const {
      clickWrapStyle, renderData, filter, groupKey,
    } = this.props;
    const { clickwrapGroupKey, dynamicGroup } = this.state;
    if (clickWrapStyle !== prevProps.clickWrapStyle && !dynamicGroup) {
      _ps.getByKey(clickwrapGroupKey).site.set('style', clickWrapStyle);
      _ps.getByKey(clickwrapGroupKey).retrieveHTML();
    }
    if (renderData !== prevProps.renderData) {
      _ps(`${clickwrapGroupKey}:retrieveHTML`, renderData);
    }
    if (clickWrapStyle !== prevProps.clickWrapStyle && dynamicGroup) {
      this.createClickWrap();
    }
    if (filter !== prevProps.filter && dynamicGroup) {
      this.createClickWrap();
    }
    if (groupKey !== prevProps.groupKey && !dynamicGroup) {
      this.createClickWrap();
      _ps.getByKey(clickwrapGroupKey).retrieveHTML();
    }
  }

  componentWillUnmount() {
    const { groupKey } = this.props;
    if (_ps && _ps.getByKey(groupKey) && _ps.getByKey(groupKey).rendered) {
      _ps.getByKey(groupKey).rendered = false;
    }
    this.unregisterEventListeners(this.state.clickwrapGroupKey);
  }

  registerEventListener(eventProp, groupKey) {
    const eventCallbackFn = (...args) => {
      let shouldFireListener = false;
      args.forEach((arg) => {
        // On set's context is not always passed as a ClickwrapGroup, if its a parameter being set such as the signer ID
        // So we check that the context's toString represents a Site and fire for all group keys under that site. If it if
        // passed, we use that context to ensure the event fires for only the correct clickwrap
        if (arg.get && arg.get('key') && arg.get('key') === groupKey) {
          shouldFireListener = true;
        } else if (arg.toString() === '[object Site]') {
          shouldFireListener = true;
        }
      });
      if (shouldFireListener) {
        this.props[eventProp](...args);
      }
    };
    // In order to handle unregistration of event listeners, we override the toString function to identify the
    // function by a UUID rather than the default toString of a function.
    const newEventListenerID = uuid();
    eventCallbackFn.toString = () => newEventListenerID;
    _ps.on(this.propsEventMap[eventProp], eventCallbackFn);
    return eventCallbackFn.toString();
  }

  registerEventListeners(groupKey) {
    const eventListeners = {};
    Object.keys(this.propsEventMap).forEach((eventProp) => {
      if (this.props[eventProp]) {
        eventListeners[this.propsEventMap[eventProp]] = this.registerEventListener(eventProp, groupKey);
      }
    });
    // Store event listeners in state so we can unregister them later on unmount
    this.setState({ eventListeners });
  }

  unregisterEventListeners() {
    Object.keys(this.state.eventListeners).forEach((event) => {
      const eventUUID = this.state.eventListeners[event];
      // In order to unregister the event, we must create a fake function (typeof passed to _ps.off must be a function),
      // that returns the UUID we want to unregister.
      const fakeEventListener = () => eventUUID;
      fakeEventListener.toString = () => eventUUID;
      _ps.off(event, fakeEventListener);
    });
  }

  createClickWrap() {
    const { filter, containerId, signerIdSelector, clickWrapStyle, displayAll, renderData, displayImmediately, forceScroll, groupKey, confirmationEmail } = this.props;
    const options = { filter, container_selector: containerId, confirmation_email: confirmationEmail, signer_id_selector: signerIdSelector, style: clickWrapStyle, display_all: displayAll, render_data: renderData, auto_run: displayImmediately, force_scroll: forceScroll };

    if (groupKey) this.setState({ clickwrapGroupKey: groupKey, dynamicGroup: false });
    const dynamic = !groupKey;

    const eventCallback = (err, group) => {
      if (group) {
        const key = groupKey || group.get('key');

        const state = { clickwrapGroupKey: key };
        if (dynamic) state.dynamicGroup = true;
        this.setState(state);

        if (!dynamic) group.render();
        this.registerEventListeners(key);
      }
    };

    if (groupKey) _ps('load', groupKey, { ...options, event_callback: eventCallback });
    else _ps('load', { ...options, event_callback: eventCallback });
  }


  render() {
    const { containerId } = this.props;
    return <div id={containerId} />;
  }
}

PSClickWrap.FILTER_OR_GROUPKEY_REQUIRED_ERROR_MESSAGE = 'PSClickWrap Error: You must provide either a groupKey or filter prop in order to use the PactSafe ClickWrap component!';
PSClickWrap.MUST_PROVIDE_RENDER_DATA_ERROR_MESSAGE = 'PSClickWrap Error: You must provide a renderData prop when passing down the dynamic prop';
PSClickWrap.MUST_PROVIDE_SIGNER_ID_OR_SIGNER_ID_SELECTOR = 'PSClickWrap Error: You must provide either a signer ID or a signer ID selector';

PSClickWrap.propTypes = {
  accessId: PropTypes.string.isRequired,
  clickWrapStyle: PropTypes.oneOf([
    'full',
    'scroll',
    'checkbox',
    'combined',
    'embedded',
  ]),
  confirmationEmail: PropTypes.bool,
  disableSending: PropTypes.bool,
  displayAll: PropTypes.bool,
  displayImmediately: PropTypes.bool,
  dynamic: PropTypes.bool,
  containerId: PropTypes.string,
  filter: isRequiredIf(
    PropTypes.string,
    props => !props.hasOwnProperty('groupKey'),
    PSClickWrap.FILTER_OR_GROUPKEY_REQUIRED_ERROR_MESSAGE,
  ),
  forceScroll: PropTypes.bool,
  groupKey: isRequiredIf(
    PropTypes.string,
    props => !props.hasOwnProperty('filter'),
    PSClickWrap.FILTER_OR_GROUPKEY_REQUIRED_ERROR_MESSAGE,
  ),
  psScriptUrl: PropTypes.string,
  backupScriptURL: PropTypes.string,
  renderData: isRequiredIf(
    PropTypes.object,
    props => props.hasOwnProperty('dynamic') && props.dynamic === true,
    PSClickWrap.MUST_PROVIDE_RENDER_DATA_ERROR_MESSAGE,
  ),
  signerIdSelector: isRequiredIf(
    PropTypes.string,
    props => !props.hasOwnProperty('signerId'),
    PSClickWrap.MUST_PROVIDE_SIGNER_ID_OR_SIGNER_ID_SELECTOR,
  ),
  signerId: isRequiredIf(
    PropTypes.string,
    props => !props.hasOwnProperty('signerIdSelector'),
    PSClickWrap.MUST_PROVIDE_SIGNER_ID_OR_SIGNER_ID_SELECTOR,
  ),
  testMode: PropTypes.bool,
  debug: PropTypes.bool,
  onAll: PropTypes.func,
  onSent: PropTypes.func,
  onRetrieved: PropTypes.func,
  onSet: PropTypes.func,
  onSetSignerId: PropTypes.func,
  onValid: PropTypes.func,
  onInvalid: PropTypes.func,
  onRendered: PropTypes.func,
  onDisplayed: PropTypes.func,
  onScrolledContract: PropTypes.func,
  onScrolled: PropTypes.func,
  onError: PropTypes.func,
};

PSClickWrap.defaultProps = {
  psScriptUrl: '//vault.pactsafe.io/ps.min.js',
  backupScriptURL: '//d3l1mqnl5xpsuc.cloudfront.net/ps.min.js',
  containerId: 'ps-clickwrap',
  displayImmediately: true,
  disableSending: false,
  displayAll: true,
  dynamic: false,
  testMode: false,
};

export default PSClickWrap;
