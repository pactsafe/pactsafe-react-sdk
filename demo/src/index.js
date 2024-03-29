import React from 'react';
import { render } from 'react-dom';
import { PSClickWrap } from '../../src';
import './styles.css';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signerIdValue: '',
      clickwrapStyle: 'full',
      needsAgreeWarning: false,
      dynamicRenderData: {
        user_token_value: 'enter your email above to update this text',
        another_token_value: 'lorem ipsum',
        last_token_value: '$9999',
      },
      hasAgreed: false,
    };
  }

  static onEventMethod = (name, ...args) => {
    console.log(`${name} prop callback called for PSClickwrap with parameters: `, [...args]);
  };

  static onError = (...args) => {
    if (args[0] === 'Command aborted on: validationTask, Error: missing_signer_id') {
      alert('Please enter a signer ID (email address) before agreeing.');
    }
    Demo.onEventMethod('onError', ...args);
  };

  handleChangeSignerId = (e) => {
    this.setState({ signerIdValue: e.target.value });
  };

  updateRenderData = () => {
    this.setState((state) => ({
      dynamicRenderData: {
        ...state.dynamicRenderData,
        another_token_value: 'This value was updated through user interaction!',
        last_token_value: '$1,000,000',
      },
    }));
  };

  updateClickwrapStyle = (e) => {
    this.setState({ clickwrapStyle: e.target.value });
  };

  onUpdateSignerId = (...args) => {
    this.setState((state) => ({
      dynamicRenderData: {
        ...state.dynamicRenderData,
        user_token_value: args[0],
      },
    }));
    Demo.onEventMethod('onSetSignerId', ...args);
  };

  onValid = (...args) => {
    this.setState({ hasAgreed: true });
    Demo.onEventMethod('onValid', ...args);
  };

  onInvalid = (...args) => {
    this.setState({ hasAgreed: false });
    Demo.onEventMethod('onInvalid', ...args);
  };

  onClickSubmit = () => {
    const { hasAgreed } = this.state;
    if (hasAgreed) {
      alert(
        'Thanks for trying out the React SDK! (It does not actually bind you to anything, just a demo :)!',
      );
    } else {
      this.setState({ needsAgreeWarning: true });
    }
  };

  render() {
    const {
      clickwrapStyle,
      dynamicRenderData,
      needsAgreeWarning,
      hasAgreed,
      signerIdValue,
    } = this.state;
    return (
      <div className="container">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <h1>Ironclad Clickwrap React SDK - Example Clickwrap</h1>
        <h2>
          <a href="https://github.com/PactSafe/pactsafe-react-sdk">View project on GitHub</a>
        </h2>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter an email address"
            className="form-control"
            onBlur={this.handleChangeSignerId}
          />
        </div>
        <button className="btn btn-primary" type="button" onClick={this.updateRenderData}>
          Change render data

        </button>
        <br />
        <div style={{ float: 'right' }}>
          PSClickwrap Style:
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className={`btn btn-primary btn-sm ${clickwrapStyle === 'full' ? 'active' : ''}`}
              value="full"
              onClick={this.updateClickwrapStyle}
            >
              Full

            </button>
            <button
              type="button"
              className={`btn btn-primary btn-sm ${clickwrapStyle === 'scroll' ? 'active' : ''}`}
              value="scroll"
              onClick={this.updateClickwrapStyle}
            >
              Scroll

            </button>
            <button
              type="button"
              className={`btn btn-primary btn-sm ${clickwrapStyle === 'checkbox' ? 'active' : ''}`}
              value="checkbox"
              onClick={this.updateClickwrapStyle}
            >
              Checkbox

            </button>
            <button
              type="button"
              className={`btn btn-primary btn-sm ${clickwrapStyle === 'combined' ? 'active' : ''}`}
              value="combined"
              onClick={this.updateClickwrapStyle}
            >
              Combined

            </button>
            <button
              type="button"
              className={`btn btn-primary btn-sm ${clickwrapStyle === 'embedded' ? 'active' : ''}`}
              value="embedded"
              onClick={this.updateClickwrapStyle}
            >
              Embedded

            </button>
          </div>
        </div>
        <br />
        <PSClickWrap
          accessId={process.env.PACTSAFE_ACCESS_ID}
          groupKey="example-web-group"
          confirmationEmail
          displayImmediately={false}
          testMode
          dynamic
          signerId={signerIdValue}
          renderData={dynamicRenderData}
          clickWrapStyle={clickwrapStyle}
          onValid={this.onValid}
          onSent={(...args) => Demo.onEventMethod('onSent', ...args)}
          onInvalid={this.onInvalid}
          onDisplayed={(...args) => Demo.onEventMethod('onDisplayed', ...args)}
          onError={Demo.onError}
          onSetSignerId={this.onUpdateSignerId}
          onSet={(...args) => Demo.onEventMethod('onSet', ...args)}
          onRendered={(...args) => Demo.onEventMethod('onRendered', ...args)}
          onRetrieved={(...args) => Demo.onEventMethod('onRetrieved', ...args)}
        />
        {needsAgreeWarning && (
        <div className="alert alert-warning" role="alert">
          Please agree to all contracts with an email address above before submitting!

        </div>
        )}
        <button
          className={`btn btn-primary ${hasAgreed ? '' : 'disabled'}`}
          type="submit"
          onClick={this.onClickSubmit}
        >
          Submit
        </button>
        <br />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
