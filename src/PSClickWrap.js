/*global _ps*/
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredIf from 'react-proptype-conditional-require';

class PSClickWrap extends React.Component {

    constructor(props) {
        super(props);
        this.isSnippetLoaded = this.isSnippetLoaded.bind(this);
        const PSUrl = this.props.psScriptURL;
        if (!this.isSnippetLoaded(PSUrl)) {
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
    }

    isSnippetLoaded(PSUrl) {
        if (!PSUrl) {
            PSUrl = this.props.psScriptURL;
        }
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src === PSUrl) return true;
        }
        return false;
    }


    componentWillMount() {
        _ps('create', this.props.accessId, {
            test_mode: this.props.testMode,
            disable_sending: this.props.disableSending,
            dynamic: this.props.dynamic
        });

    }

    componentDidMount() {
        const options = {
            filter: this.props.filter,
            container_selector: this.props.containerName,
            signer_id_selector: this.props.signerIDSelector,
            style: this.props.clickWrapStyle,
            display_all: this.props.displayAll,
            render_data: this.props.renderData,
            auto_run: this.props.displayImmediately,
            force_scroll: this.props.forceScroll
        };
        const groupKey = this.props.groupKey;
        if (groupKey) {
            _ps('load', groupKey, {
                ...options,
                event_callback: function (err, group) {
                    try{
                        group.render();
                    }catch(e){
                        console.log("Unable to re-render clickwrap")
                    }
                }

            });
        } else {
            _ps('load', {
                ...options
            });
        }
    }

    render() {
        return (
            <div id={this.props.containerName}></div>
        )
    }

    componentWillUnmount(){
        try{
            _ps.getByKey(this.props.groupKey).rendered = false;
        }catch(e){

        }
    }

}

PSClickWrap.FILTER_OR_GROUPKEY_REQUIRED_ERROR_MESSAGE = 'PSClickWrap Error: You must provide either a groupKey or filter prop in order to use the PactSafe Clickwrap component!';
PSClickWrap.MUST_PROVIDE_RENDER_DATA_ERROR_MESSAGE = 'PSClickWrap Error: You must provide a renderData prop when passing down the dynamic prop';

PSClickWrap.propTypes = {
    accessId: PropTypes.string.isRequired,
    groupKey: isRequiredIf(PropTypes.string, props => !props.hasOwnProperty('filter'), PSClickWrap.FILTER_OR_GROUPKEY_REQUIRED_ERROR_MESSAGE),
    signerIDSelector: PropTypes.string.isRequired,
    containerName: PropTypes.string.isRequired,
    testMode: PropTypes.bool,
    disableSending: PropTypes.bool,
    filter: isRequiredIf(PropTypes.string, props => !props.hasOwnProperty('groupKey'), PSClickWrap.FILTER_OR_GROUPKEY_REQUIRED_ERROR_MESSAGE),
    clickWrapStyle: PropTypes.string,
    displayAll: PropTypes.bool,
    dynamic: PropTypes.bool,
    renderData: isRequiredIf(PropTypes.object, props => (props.hasOwnProperty('dynamic') && props.dynamic === true), PSClickWrap.MUST_PROVIDE_RENDER_DATA_ERROR_MESSAGE),
    psScriptURL: PropTypes.string.isRequired,
    forceScroll: PropTypes.bool,
    confirmationEmail: PropTypes.bool,
    displayImmediately: PropTypes.bool

};

PSClickWrap.defaultProps = {
    psScriptURL: "//vault.pactsafe.io/ps.min.js",
    containerName: "ps-clickwrap",
    displayImmediately: true
};

export default PSClickWrap;
