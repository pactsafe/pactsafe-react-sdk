import React from 'react';
import { render } from 'react-dom';
import { PSClickWrap, PSBrowseWrap } from '../../src';
import styles from './styles.css';

class Demo extends React.Component {
  render() {
    return (
      <div className="container">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
        <h1>PactSafe React SDK - Example Clickwrap & Browsewrap</h1>
        <h2>
          <a href="https://github.com/PactSafe/pactsafe-react-sdk">
						View project on GitHub

          </a>
        </h2>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Signer ID" className="form-control" />
        </div>

        <br />
        <PSClickWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" signerIDSelector="email" groupKey="example-clickwrap" displayAll testMode clickWrapStyle="full" />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={() => {
				  if (document.getElementById('email').value === '') {
				    alert('You must provide a signer id before submitting!');
				  } else if (_ps.getByKey('example-clickwrap').allChecked()) {
				    alert('You agreed! Thanks! :)');
				  } else {
				    alert('You must accept the ClickWrap before you can submit!');
				  }
          }}
        >
					Submit
        </button>
        <br />
        <br />
        <br />
        {/* <PSBrowseWrap accessId="29ea80d9-d386-4cfd-a280-505e802ee732" groupKey="example-browsewrap" linkText="Legal Center" alwaysVisible position="right" /> */}
        <br />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
