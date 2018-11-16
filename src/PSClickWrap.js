/* global _ps */
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredIf from 'react-proptype-conditional-require';
import injectSnippet from './PSSnippet';

class PSClickWrap extends React.Component {
  constructor(props) {
    super(props);
    this.isSnippetLoaded = this.isSnippetLoaded.bind(this);
  }

  componentWillMount() {
    const {
      psScriptURL,
      accessId,
      testMode,
      disableSending,
      dynamic,
      signerID,
    } = this.props;
    if (!this.isSnippetLoaded()) {
      injectSnippet(psScriptURL);
    }
    _ps('create', accessId, {
      test_mode: testMode,
      disable_sending: disableSending,
      dynamic,
      signer_id: signerID,
    });
  }

  componentDidMount() {
    const {
      filter,
      containerName,
      signerIDSelector,
      clickWrapStyle,
      displayAll,
      renderData,
      displayImmediately,
      forceScroll,
      groupKey,
      confirmationEmail,
    } = this.props;
    const options = {
      filter,
      container_selector: containerName,
      confirmation_email: confirmationEmail,
      signer_id_selector: signerIDSelector,
      style: clickWrapStyle,
      display_all: displayAll,
      render_data: renderData,
      auto_run: displayImmediately,
      force_scroll: forceScroll,
    };
    if (groupKey) {
      _ps('load', groupKey, {
        ...options,
        event_callback(err, group) {
          if (group) group.render();
        },
      });
    } else {
      _ps('load', {
        ...options,
      });
    }
  }

  componentWillUnmount() {
    const { groupKey } = this.props;
    if (_ps && _ps.getByKey(groupKey) && _ps.getByKey(groupKey).rendered) {
      _ps.getByKey(groupKey).rendered = false;
    }
  }

  isSnippetLoaded() {
    const { psScriptURL } = this.props;
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i += 1) {
      if (scripts[i].src === psScriptURL) return true;
    }
    return false;
  }


  render() {
    const { containerName } = this.props;
    return <div id={containerName} />;
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
  containerName: PropTypes.string,
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
  psScriptURL: PropTypes.string,
  renderData: isRequiredIf(
    PropTypes.object,
    props => props.hasOwnProperty('dynamic') && props.dynamic === true,
    PSClickWrap.MUST_PROVIDE_RENDER_DATA_ERROR_MESSAGE,
  ),
  signerIDSelector: isRequiredIf(
    PropTypes.string,
    props => !props.hasOwnProperty('signerID'),
    PSClickWrap.MUST_PROVIDE_SIGNER_ID_OR_SIGNER_ID_SELECTOR,
  ),
  signerID: isRequiredIf(
    PropTypes.string,
    props => !props.hasOwnProperty('signerIDSelector'),
    PSClickWrap.MUST_PROVIDE_SIGNER_ID_OR_SIGNER_ID_SELECTOR,
  ),
  testMode: PropTypes.bool,
};

PSClickWrap.defaultProps = {
  confirmationEmail: false,
  psScriptURL: '//vault.pactsafe.io/ps.min.js',
  containerName: 'ps-clickwrap',
  displayImmediately: true,
  disableSending: false,
  displayAll: true,
  dynamic: false,
  testMode: false,
};

export default PSClickWrap;
