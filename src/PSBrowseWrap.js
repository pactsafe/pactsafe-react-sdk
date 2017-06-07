/* global _ps */
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredIf from 'react-proptype-conditional-require';

class PSBrowseWrap extends React.Component{
    constructor(props){
        super(props);
        const PSUrl = this.props.psScriptURL;
        if (!this.isSnippetLoaded(PSUrl)){
            (function (window, document, script, src, pso, a, m) {
                window['PactSafeObject'] = pso;
                window[pso] = window[pso] || function () {
                    (window[pso].q = window[pso].q || []).push(arguments)
                }, window[pso].on = function () {
                    (window[pso].e = window[pso].e || []).push(arguments)
                }, window[pso].once = function () {
                    (window[pso].eo = window[pso].eo || []).push(arguments)
                }, window[pso].off = function () {
                    (window[pso].o = window[pso].o || []).push(arguments)
                }, window[pso].t = 1 * new Date();
                a = document.createElement(script),
                m = document.getElementsByTagName(script)[0];
                a.async = 1;
                a.src = src;
                m.parentNode.insertBefore(a, m);
                window[pso].debug = true;
            })(window, document, 'script', PSUrl, '_ps');
        }
        this.targetSelector = 'psbw-' + this.props.groupKey;
    }

    isSnippetLoaded(PSUrl){
        if (!PSUrl){
            PSUrl = this.props.psScriptURL;
        }
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++){
            if (scripts[i].src === PSUrl) return true;
        }
        return false;
    }

    componentWillMount(){
        _ps('create', this.props.accessId);
    }

    componentDidMount(){
        _ps('load', this.props.groupKey, {
            target_selector: this.targetSelector,
            position: this.props.position,
            badge_text: this.props.badgeText,
            always_visible: this.props.alwaysVisible,
            open_legal_center: this.props.openLegalCenter
        });
    }

    render(){
        return(
            <a href={this.props.link} id={this.targetSelector}>{this.props.linkText}</a>
        );
    }

    componentWillUnmount(){
        _ps.getByKey(this.props.groupKey).rendered = false
    }
}

PSBrowseWrap.MUST_PROVIDE_LINK_IF_OPEN_LEGAL_CENTER_FALSE = "PSBrowseWrap Error: You must provide a link prop if openLegalCenter is passed false"

PSBrowseWrap.propTypes = {
    psScriptURL: PropTypes.string.isRequired,
    accessId: PropTypes.string.isRequired,
    groupKey: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    position: PropTypes.oneOf(['middle','left', 'right', 'auto']).isRequired,
    alwaysVisible: PropTypes.bool,
    badgeText: PropTypes.string,
    openLegalCenter: PropTypes.bool,
    link: isRequiredIf(PropTypes.string, props => (props.hasOwnProperty('openLegalCenter') && props.openLegalCenter === false), PSBrowseWrap.MUST_PROVIDE_LINK_IF_OPEN_LEGAL_CENTER_FALSE)
};

PSBrowseWrap.defaultProps = {
    psScriptURL: "//vault.pactsafe.io/ps.min.js",
    position: 'auto'
};

export default PSBrowseWrap;