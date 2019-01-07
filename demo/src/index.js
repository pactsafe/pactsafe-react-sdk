import React from 'react';
import { render } from 'react-dom';
import { PSClickWrap, PSBrowseWrap } from '../../src';
import './styles.css';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

 updateRenderData = () => {
   this.setState(state => ({
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

 onEventMethod = (name, ...args) => {
   console.log(
     `${name} prop callback called for PSClickwrap with parameters: `,
     [...args],
   );
 };

 onUpdateSignerId = (...args) => {
   this.setState(state => ({
     dynamicRenderData: {
       ...state.dynamicRenderData,
       user_token_value: args[0],
     },
   }));
   this.onEventMethod('onSetSignerId', ...args);
 };

 onValid = (...args) => {
   this.setState({ hasAgreed: true });
   this.onEventMethod('onValid', ...args);
 };

 onInvalid = (...args) => {
   this.setState({ hasAgreed: false });
   this.onEventMethod('onInvalid', ...args);
 };

 onError = (...args) => {
   if (
     args[0] === 'Command aborted on: validationTask, Error: missing_signer_id'
   ) {
     alert('Please enter a signer ID (email address) before agreeing.');
   }
   this.onEventMethod('onError', ...args);
 };

 onClickSubmit = () => {
   if (this.state.hasAgreed) {
     alert(
       'Thanks for trying out the React SDK! (It does not actually bind you to anything, just a demo :)!',
     );
   } else {
     this.setState({ needsAgreeWarning: true });
   }
 };

 render() {
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
           placeholder="Enter an email address"
           className="form-control"
         />
       </div>
       <button
         className="btn btn-primary"
         type="button"
         onClick={this.updateRenderData}
       >
     Change render data

       </button>
       <br />
       <div style={{ float: 'right' }}>
     Clickwrap Style:
         <div className="btn-group" role="group" aria-label="Basic example">
           <button
             type="button"
             className={`btn btn-primary btn-sm ${
               this.state.clickwrapStyle === 'full' ? 'active' : ''
             }`}
             value="full"
             onClick={this.updateClickwrapStyle}
           >
       Full

           </button>
           <button
             type="button"
             className={`btn btn-primary btn-sm ${
               this.state.clickwrapStyle === 'scroll' ? 'active' : ''
             }`}
             value="scroll"
             onClick={this.updateClickwrapStyle}
           >
       Scroll

           </button>
           <button
             type="button"
             className={`btn btn-primary btn-sm ${
               this.state.clickwrapStyle === 'checkbox' ? 'active' : ''
             }`}
             value="checkbox"
             onClick={this.updateClickwrapStyle}
           >
       Checkbox

           </button>
           <button
             type="button"
             className={`btn btn-primary btn-sm ${
               this.state.clickwrapStyle === 'combined' ? 'active' : ''
             }`}
             value="combined"
             onClick={this.updateClickwrapStyle}
           >
       Combined

           </button>
           <button
             type="button"
             className={`btn btn-primary btn-sm ${
               this.state.clickwrapStyle === 'embedded' ? 'active' : ''
             }`}
             value="embedded"
             onClick={this.updateClickwrapStyle}
           >
       Embedded

           </button>
         </div>
       </div>
       <br />
       <PSClickWrap
         accessId="29ea80d9-d386-4cfd-a280-505e802ee732"
         signerIdSelector="email"
         groupKey="dynamic-clickwrap"
         displayAll
         testMode
         dynamic
         renderData={this.state.dynamicRenderData}
         clickWrapStyle={this.state.clickwrapStyle}
         onValid={this.onValid}
         onSent={(...args) => this.onEventMethod('onSent', ...args)}
         onInvalid={this.onInvalid}
         onDisplayed={(...args) => this.onEventMethod('onDisplayed', ...args)}
         onError={this.onError}
         onSetSignerId={this.onUpdateSignerId}
         onSet={(...args) => this.onEventMethod('onSet', ...args)}
         onRendered={(...args) => this.onEventMethod('onRendered', ...args)}
         onRetrieved={(...args) => this.onEventMethod('onRetrieved', ...args)}
       />
       {this.state.needsAgreeWarning && (
       <div className="alert alert-warning" role="alert">
      Please agree to all contracts with an email address above before
      submitting!

       </div>
       )}

       <button
         className={`btn btn-primary ${
           this.state.hasAgreed ? '' : 'disabled'
         }`}
         type="submit"
         onClick={this.onClickSubmit}
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
