/* global _ps */
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredIf from 'react-proptype-conditional-require';
import PSSnippet from './PSSnippet';

class PSBrowseWrap extends React.Component {
  constructor(props) {
    super(props);
    const { psScriptUrl, groupKey, accessId } = this.props;
    if (!PSSnippet.isSnippetLoaded(psScriptUrl)) {
      PSSnippet.injectSnippet(psScriptUrl);
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
    (props) => props.hasOwnProperty('openLegalCenter') && props.openLegalCenter === false,
    PSBrowseWrap.MUST_PROVIDE_LINK_IF_OPEN_LEGAL_CENTER_FALSE,
  ),
  linkText: PropTypes.string.isRequired,
  openLegalCenter: PropTypes.bool,
  position: PropTypes.oneOf(['middle', 'left', 'right', 'auto']),
  psScriptUrl: PropTypes.string,
};

PSBrowseWrap.defaultProps = {
  psScriptUrl: '//vault.pactsafe.io/ps.min.js',
  position: 'auto',
  link: '#',
  openLegalCenter: true,
};

export default PSBrowseWrap;
