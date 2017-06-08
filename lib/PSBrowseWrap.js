/* global _ps */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

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

var PSBrowseWrap = (function (_React$Component) {
    _inherits(PSBrowseWrap, _React$Component);

    function PSBrowseWrap(props) {
        _classCallCheck(this, PSBrowseWrap);

        _get(Object.getPrototypeOf(PSBrowseWrap.prototype), 'constructor', this).call(this, props);
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
        this.targetSelector = 'psbw-' + this.props.groupKey;
    }

    _createClass(PSBrowseWrap, [{
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
            _ps('create', this.props.accessId);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            _ps('load', this.props.groupKey, {
                target_selector: this.targetSelector,
                position: this.props.position,
                badge_text: this.props.badgeText,
                always_visible: this.props.alwaysVisible,
                open_legal_center: this.props.openLegalCenter
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'a',
                { href: this.props.link, id: this.targetSelector },
                this.props.linkText
            );
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _ps.getByKey(this.props.groupKey).rendered = false;
        }
    }]);

    return PSBrowseWrap;
})(_react2['default'].Component);

PSBrowseWrap.MUST_PROVIDE_LINK_IF_OPEN_LEGAL_CENTER_FALSE = 'PSBrowseWrap Error: You must provide a link prop if openLegalCenter is passed false';

PSBrowseWrap.propTypes = {
    accessId: _propTypes2['default'].string.isRequired,
    alwaysVisible: _propTypes2['default'].bool,
    badgeText: _propTypes2['default'].string,
    groupKey: _propTypes2['default'].string.isRequired,
    link: (0, _reactProptypeConditionalRequire2['default'])(_propTypes2['default'].string, function (props) {
        return props.hasOwnProperty('openLegalCenter') && props.openLegalCenter === false;
    }, PSBrowseWrap.MUST_PROVIDE_LINK_IF_OPEN_LEGAL_CENTER_FALSE),
    linkText: _propTypes2['default'].string.isRequired,
    openLegalCenter: _propTypes2['default'].bool,
    position: _propTypes2['default'].oneOf(['middle', 'left', 'right', 'auto']).isRequired,
    psScriptURL: _propTypes2['default'].string.isRequired
};

PSBrowseWrap.defaultProps = {
    psScriptURL: '//vault.pactsafe.io/ps.min.js',
    position: 'auto'
};

exports['default'] = PSBrowseWrap;
module.exports = exports['default'];