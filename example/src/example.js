var React = require('react');
var ReactDOM = require('react-dom');
var PactSafeSDK = require('pactsafe-react-sdk');
var PSClickWrap = PactSafeSDK.PSClickWrap;
var PSBrowseWrap = PactSafeSDK.PSBrowseWrap;

var App = React.createClass({
	render () {
		return (
			<div>
				<input type="email" id="email" placeholder="Signer ID"/>
				<br/>
				<PSClickWrap accessId={'29ea80d9-d386-4cfd-a280-505e802ee732'} signerIDSelector={'email'} groupKey={'example-clickwrap'} displayAll={true} testMode={true}/>
				<button type="submit" onClick={()=>{
					if (document.getElementById('email').value === ''){
						alert('You must provide a signer id before submitting!');
					} else if (_ps.getByKey('example-clickwrap').allChecked()){
						alert('You agreed! Thanks! :)');
					}else{
						alert('You must accept the ClickWrap before you can submit!');
					}
				}}>Submit</button>
				<br/>
				<br/><br/>
				<PSBrowseWrap accessId={'29ea80d9-d386-4cfd-a280-505e802ee732'} groupKey={'example-browsewrap'} linkText={'Legal Center'} alwaysVisible position={'right'}/>
				<br/>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
