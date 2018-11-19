/* global _ps */
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredIf from 'react-proptype-conditional-require';
import injectSnippet from './PSSnippet';

class PSBrowseWrap extends React.Component {
  constructor(props) {
    super(props);
    this.isSnippetLoaded = this.isSnippetLoaded.bind(this);
    const { psScriptURL, groupKey, accessId } = this.props;
    if (!this.isSnippetLoaded(psScriptURL)) {
      injectSnippet(psScriptURL);
    }
    this.targetSelector = `psbw-${groupKey}`;
    _ps('create', accessId);
  }


  componentDidMount() {
    const { groupKey, position, badgeText, alwaysVisible, openLegalCenter } = this.props;
    _ps('load', groupKey, {
      target_selector: this.targetSelector,
      position,
      badge_text: badgeText,
      always_visible: alwaysVisible,
      open_legal_center: openLegalCenter,
    });
  }


  componentWillUnmount() {
    const { groupKey } = this.props;
    _ps.getByKey(groupKey).rendered = false;
  }

  isSnippetLoaded() {
    const { psScriptURL } = this.props;
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i += 1) {
      if (scripts[i].src.indexOf(psScriptURL) !== -1) return true;
    }
    return false;
  }

  render() {
    const { link, linkText } = this.props;
    return (
      <a href={link} id={this.targetSelector}>
        {linkText}
      </a>
    );
  }
}

PSBrowseWrap.MUST_PROVIDE_LINK_IF_OPEN_LEGAL_CENTER_FALSE = 'PSBrowseWrap Error: You must provide a link prop if openLegalCenter is passed false';

PSBrowseWrap.propTypes = {
  accessId: PropTypes.string.isRequired,
  alwaysVisible: PropTypes.bool,
  badgeText: PropTypes.string,
  groupKey: PropTypes.string.isRequired,
  link: isRequiredIf(
    PropTypes.string,
    props => props.hasOwnProperty('openLegalCenter') && props.openLegalCenter === false,
    PSBrowseWrap.MUST_PROVIDE_LINK_IF_OPEN_LEGAL_CENTER_FALSE,
  ),
  linkText: PropTypes.string.isRequired,
  openLegalCenter: PropTypes.bool,
  position: PropTypes.oneOf(['middle', 'left', 'right', 'auto']),
  psScriptURL: PropTypes.string,
};

PSBrowseWrap.defaultProps = {
  psScriptURL: '//vault.pactsafe.io/ps.min.js',
  position: 'auto',
  link: '#',
  openLegalCenter: true,
};

export default PSBrowseWrap;
