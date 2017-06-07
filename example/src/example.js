var React = require('react');
var ReactDOM = require('react-dom');
var PactSafeReactSdk = require('pactsafe-react-sdk');

var App = React.createClass({
	render () {
		return (
			<div>
				<PactSafeReactSdk />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
