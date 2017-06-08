/*global _ps*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactProptypeConditionalRequire = require('react-proptype-conditional-require');

var _reactProptypeConditionalRequire2 = _interopRequireDefault(_reactProptypeConditionalRequire);

var PSClickWrap = (function (_React$Component) {
    _inherits(PSClickWrap, _React$Component);

    function PSClickWrap(props) {
        _classCallCheck(this, PSClickWrap);

        _get(Object.getPrototypeOf(PSClickWrap.prototype), 'constructor', this).call(this, props);
        this.isSnippetLoaded = this.isSnippetLoaded.bind(this);
        var PSUrl = this.props.psScriptURL;
        if (!this.isSnippetLoaded(PSUrl)) {
            (function (window, document, script, src, pso, a, m) {
                window['PactSafeObject'] = pso;
                window[pso] = window[pso] || function () {
                    (window[pso].q = window[pso].q || []).push(arguments);
                }, window[pso].on = function () {
                    (window[pso].e = window[pso].e || []).push(arguments);
                }, window[pso].once = function () {
                    (window[pso].eo = window[pso].eo || []).push(arguments);
                }, window[pso].off = function () {
                    (window[pso].o = window[pso].o || []).push(arguments);
                }, window[pso].t = 1 * new Date();
                a = document.createElement(script), m = document.getElementsByTagName(script)[0];
                a.async = 1;
                a.src = src;
                m.parentNode.insertBefore(a, m);
                window[pso].debug = true;
            })(window, document, 'script', PSUrl, '_ps');
        }
    }

    _createClass(PSClickWrap, [{
        key: 'isSnippetLoaded',
        value: function isSnippetLoaded(PSUrl) {
            if (!PSUrl) {
                PSUrl = this.props.psScriptURL;
            }
            var scripts = document.getElementsByTagName('script');
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].src === PSUrl) return true;
            }
            return false;
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            _ps('create', this.props.accessId, {
                test_mode: this.props.testMode,
                disable_sending: this.props.disableSending,
                dynamic: this.props.dynamic
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var options = {
                filter: this.props.filter,
                container_selector: this.props.containerName,
                signer_id_selector: this.props.signerIDSelector,
                style: this.props.clickWrapStyle,
                display_all: this.props.displayAll,
                render_data: this.props.renderData,
                auto_run: this.props.displayImmediately,
                force_scroll: this.props.forceScroll
            };
            var groupKey = this.props.groupKey;
            if (groupKey) {
                _ps('load', groupKey, _extends({}, options, {
                    event_callback: function event_callback(err, group) {
                        try {
                            group.render();
                        } catch (e) {
                            console.log('Unable to re-render clickwrap');
                        }
                    }

                }));
            } else {
                _ps('load', _extends({}, options));
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement('div', { id: this.props.containerName });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            try {
                _ps.getByKey(this.props.groupKey).rendered = false;
            } catch (e) {}
        }
    }]);

    return PSClickWrap;
})(_react2['default'].Component);

PSClickWrap.FILTER_OR_GROUPKEY_REQUIRED_ERROR_MESSAGE = 'PSClickWrap Error: You must provide either a groupKey or filter prop in order to use the PactSafe ClickWrap component!';
PSClickWrap.MUST_PROVIDE_RENDER_DATA_ERROR_MESSAGE = 'PSClickWrap Error: You must provide a renderData prop when passing down the dynamic prop';

PSClickWrap.propTypes = {
    accessId: _propTypes2['default'].string.isRequired,
    clickWrapStyle: _propTypes2['default'].oneOf(['full', 'scroll', 'checkbox', 'combined', 'embedded']),
    confirmationEmail: _propTypes2['default'].bool,
    containerName: _propTypes2['default'].string.isRequired,
    disableSending: _propTypes2['default'].bool,
    displayAll: _propTypes2['default'].bool,
    displayImmediately: _propTypes2['default'].bool,
    dynamic: _propTypes2['default'].bool,
    filter: (0, _reactProptypeConditionalRequire2['default'])(_propTypes2['default'].string, function (props) {
        return !props.hasOwnProperty('groupKey');
    }, PSClickWrap.FILTER_OR_GROUPKEY_REQUIRED_ERROR_MESSAGE),
    forceScroll: _propTypes2['default'].bool,
    groupKey: (0, _reactProptypeConditionalRequire2['default'])(_propTypes2['default'].string, function (props) {
        return !props.hasOwnProperty('filter');
    }, PSClickWrap.FILTER_OR_GROUPKEY_REQUIRED_ERROR_MESSAGE),
    psScriptURL: _propTypes2['default'].string.isRequired,
    renderData: (0, _reactProptypeConditionalRequire2['default'])(_propTypes2['default'].object, function (props) {
        return props.hasOwnProperty('dynamic') && props.dynamic === true;
    }, PSClickWrap.MUST_PROVIDE_RENDER_DATA_ERROR_MESSAGE),
    signerIDSelector: _propTypes2['default'].string.isRequired,
    testMode: _propTypes2['default'].bool
};

PSClickWrap.defaultProps = {
    psScriptURL: '//vault.pactsafe.io/ps.min.js',
    containerName: 'ps-clickwrap',
    displayImmediately: true,
    disableSending: false,
    displayAll: true,
    dynamic: false

};

exports['default'] = PSClickWrap;
module.exports = exports['default'];