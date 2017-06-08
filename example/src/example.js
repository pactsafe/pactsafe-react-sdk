var React = require('react');
var ReactDOM = require('react-dom');
var pactsafe = require('pactsafe-react-sdk');
var PSClickWrap = pactsafe.PSClickWrap;

var App = React.createClass({
	render () {
		return (
			<div>
				<input type="email" id="email" placeholder="Signer ID"/>
				<br/>
				<PSClickWrap accessId={'29ea80d9-d386-4cfd-a280-505e802ee732'} signerIDSelector={'email'} groupKey={'example-clickwrap'} displayAll={true} testMode={true}/>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
