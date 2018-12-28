import React from 'react';
import { render } from 'react-dom';
import { PSClickWrap, PSBrowseWrap } from '../../src';
import styles from './styles.css';

class Demo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isRendered: true,
			dynamicRenderData: {
				vendor_name: "Hi guys",
				vendor_phone: "3178693251",
				vendor_price: "$9999"
			}
		};
	}

	toggleClickwraps = e => {
		console.log("toggling the shit");
		this.setState((state, props) => {
			return { isRendered: !state.isRendered };
		});
	};

	updateState = e => {
		this.setState((state, props) => {
			return {
				dynamicRenderData: {
					vendor_name: "I updated!",
					vendor_phone: "Updated phone",
					vendor_price: "$15000"
				}
			};
		});
	};
	
	onAllMethod = (a, b, c, d, e, f) => {
		console.log('on all method here', a, b, c, d, e, f);
	}

	onErrorMethod = (a, b, c, d) => {
		console.log('We got an error I think...', a, b, c, d);
	}

	onDisplayedMethod = (parameters, group) => {
		console.log("WE DISPLAYED!!! CLICKWRAP 1", parameters, group);
	};

	onAgreeMethod = (parameters, group) => {
		console.log("WE AGREED!!! CLICKWRAP 1", parameters, group);
	};

	onAgreeOtherMethod = (parameters, group) => {
		console.log("we agreed to CLICKWRAP 2!", parameters, group);
	};

	onSentMethod = (event, parameters, group) => {
		console.log("on sent called", event, parameters, group);
	};

	onValidMethod = (parameters, group) => {
		console.log("on valid called", parameters, group);
	};

	onInvalidMethod = (parameters, group) => {
		console.log("on invalid called", parameters, group);
	};

	onSent2Method = (event, parameters, group) => {
		console.log("on sent2 called", event, parameters, group);
	};

	onValid2Method = (parameters, group) => {
		console.log("on valid2 called", parameters, group);
	};

	onInvalid2Method = (parameters, group) => {
		console.log("on invalid2 called", parameters, group);
	};

	onSetSignerIDMethod = (a, b, c, d) => {
		console.log("SET PROP CALLBACK WORKING!!!!", a, b, c, d);
	}

	render() {
		let clickwraps = null;
		if (this.state.isRendered) {
			clickwraps = <div>
					<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" signerIdSelector="email" groupKey="dynamic-clickwrap" displayAll testMode clickWrapStyle="full" onAgree={this.onAgreeMethod} dynamic renderData={this.state.dynamicRenderData} onValid={this.onValidMethod} onSent={this.onSentMethod} onInvalid={this.onInvalidMethod} onDisplayed={this.onDisplayedMethod} onError={this.onErrorMethod} onSet={this.onSetSignerIDMethod}/>
					<PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" signerIdSelector="email2" filter="id==14847" displayAll testMode clickWrapStyle="full" containerId="testing" onAgree={this.onAgreeOtherMethod} onValid={this.onValid2Method} onSent={this.onSent2Method} onInvalid={this.onInvalid2Method} />
				</div>;
		}
		return (
			<div className="container">
				<link
					rel="stylesheet"
					href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
					integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
					crossOrigin="anonymous"
				/>
				<h1>PactSafe React SDK - Example Clickwrap & Browsewrap</h1>
				<h2>
					<a href="https://github.com/PactSafe/pactsafe-react-sdk">
						View project on GitHub
					</a>
				</h2>
				<div className="form-group">
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						placeholder="Signer ID"
						className="form-control"
					/>
					<input
						type="email"
						id="email2"
						placeholder="Signer ID"
						className="form-control"
					/>
				</div>
				<button
					className="btn btn-primary"
					type="button"
					onClick={this.toggleClickwraps}
				>
					Toggle visibility
				</button>
				<button
					className="btn btn-primary"
					type="button"
					onClick={this.updateState}
					style={{marginLeft: '5px'}}
				>
					Update render data
				</button>
				<br />
				{clickwraps}
				<button
					className="btn btn-primary"
					type="submit"
					onClick={() => {
						if (document.getElementById("email").value === "") {
							alert("You must provide a signer id before submitting!");
						} else if (_ps.getByKey("example-clickwrap").allChecked()) {
							alert("You agreed! Thanks! :)");
						} else {
							alert("You must accept the ClickWrap before you can submit!");
						}
					}}
				>
					Submit
				</button>
				<br />
				<br />
				<br />
				<PSBrowseWrap
					accessId="29ea80d9-d386-4cfd-a280-505e802ee732"
					groupKey="example-browsewrap"
					linkText="Legal Center"
					alwaysVisible
					position="right"
				/>
				<br />
			</div>
		);
	}
}

render(<Demo />, document.querySelector('#demo'));
