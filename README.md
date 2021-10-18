# PactSafe React SDK

[![npm package][npm-badge]][npm]

## Features

- Automatically loads the PactSafe Snippet into your app so all you have to do is call `_ps` to use the [PactSafe library](https://developer.pactsafe.com/docs/get-to-know-our-javascript-library).

#### PSClickWrap Component

- Renders a PactSafe ClickWrap group by providing a site access ID and group key
- Ability to render PactSafe ClickWrap groups dynamically using a filter to specify contract ID's and/or tags
- Ability to render a dynamic PactSafe ClickWrap by passing in a custom `render_data` object
- Ability to override properties set within the PactSafe App's group configuration such as:
  - ClickWrap style using the `clickWrapStyle` prop
  - Signer ID selector using the `signerIdSelector` prop
  - Displaying all contracts using the `displayAll` prop
  - and more! ([See more detailed documentation on available PSClickWrap props here](#props))
- Ability to hook into events fired by the Snippet using function props ([See documentation on PSClickwrap callback props here](#callback-props))

#### PSBrowseWrap Component

- Renders a PactSafe BrowseWrap group by providing a site access ID and group key
- Ability to override properties set within the PactSafe App's group configuration such as:
  - Position of BrowseWrap with the `position` prop
  - Whether the BrowseWrap should always be visible with the `alwaysVisible` prop
  - and more! ([See more detailed documentation on available PSBrowseWrap props here](#props))

## Demo & Examples

[Check out a live demo of both the PSClickwrap and PSBrowsewrap components here](https://pactsafe.github.io/pactsafe-react-sdk/)

#### PSClickWrap

![PSClickCrap](images/psclickwrap.gif "PSClickWrap")

#### PSBrowseWrap

![PSBrowseWrap](images/psbrowsewrap.gif "PSBrowseWrap")

To build the examples locally (after cloning this repo from Github), you must first add your PactSafe access id by creating a `.env` file in the root directory and add the following contents:

```
PACTSAFE_ACCESS_ID=<YOUR_PACTSAFE_ACCESS_ID_HERE>
```

After doing this, you need to create both a clickwrap group with the group key `example-clickwrap` and a browsewrap with the key `example-browsewrap`. In your example clickwrap group, if you
want the render data to work properly, create three tokens in a contract within the `example-clickwrap` group with the API field names to be: `user_token_value`, `another_token_value`, and `last_token_value`.

[Some helpful information on creating contracts with render data can be found here.](https://developer.pactsafe.com/docs/how-to-use-smart-contracts-with-the-javascript-library)
(Note: You shouldn't have to write any javascript to get the demo to work! When implementing yourself, the React SDK uses the `dynamic` and `renderData` props to handle rendering of dynamic contracts instead of having to make `_ps` calls.)

After completing these steps the demo should load as the online example does by running

```
npm install
npm start
```

Then open [`http://localhost:3000`](http://localhost:3000) in a browser.

## Installation

The easiest way to use pactsafe-react-sdk is to install it from NPM

```
npm install @pactsafe/pactsafe-react-sdk --save
```

You can also directly download the source files from [unpkg](https://unpkg.com/@pactsafe/pactsafe-react-sdk@2.0.0/) to link to the source files directly or download the source from Github and build it yourself.

The following can be found in the project's root directory, as well as compiled using `npm run build`:

- A CommonJS build in `lib/`
- An ES modules build in `es/` (enabled by default/without configuration using `npm install`)
- UMD development and production builds in `/umd`

## Usage

#### Using PSClickWrap

In order to use the PSClickWrap, you must specify a signer ID selector that corresponds to the ID of an `<input>` field on the page that will identify the signer (usually an email field). This ID should then be passed as the `signerIdSelector` prop to the PSClickWrap component:

```JSX
import { PSClickWrap } from '@pactsafe/pactsafe-react-sdk'

...

<input type="email" id="userEmail" placeholder="Your Email"/>

<PSClickWrap accessId={"YOUR_PACTSAFE_ACCESS_ID_HERE"} groupKey={"YOUR_GROUP_KEY_HERE"} signerIdSelector={"userEmail"}/>
```

Replace with `YOUR_PACTSAFE_ACCESS_ID_HERE` with your PactSafe Site Access ID found [here](https://app.pactsafe.com/settings/account)

Replace `YOUR_GROUP_KEY_HERE` with your group's key found within your [PactSafe group's configuration](https://app.pactsafe.com/groups)

Pass in any additional options using props on the `PSClickWrap` component.

You can hook into events using the triggered event callback props described here: ([See documentation on PSClickwrap callback props here](#callback-props)).

#### Using PSBrowseWrap

Your PSBrowseWrap component should be placed where you would like your Legal Center link to appear on the page. Pass what you want the link's text to display as using the `linkText` prop.

```JSX
import { PSBrowseWrap } from '@pactsafe/pactsafe-react-sdk'

...

<PSBrowseWrap accessId={YOUR_PACTSAFE_ACCESS_ID_HERE} groupKey={YOUR_GROUP_KEY_HERE} linkText={'View Legal Center'}/>
```

---

## <a name="props"></a>Props

### PSClickWrap Props

(*Note you may have to scroll to the right to see the default value*)

|         Prop         |                                                                                                                                                                                     Description                                                                                                                                                                                    |                                     Type                                     |                  Required?                  |                    Default                   |
|:--------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------:|:-------------------------------------------:|:--------------------------------------------:|
|      `accessId`      | PactSafe site access ID                                                                                                                                                                                                                                                                                                                                                            |                                    string                                    |                     Yes                     |                Required Value                |
|   `clickWrapStyle`   | Override the clickwrap style specified in the PactSafe Group Interface                                                                                                                                                                                                                                                                                                             | string.oneOf[`'full'`, `'scroll'`, `'checkbox'`, `'combined'`, `'embedded'`] |                      No                     |    Value specified in PactSafe Group's UI    |
|  `confirmationEmail` | Override whether to send a confirmation email to the signer upon contract acceptance                                                                                                                                                                                                                                                                                               |                                     bool                                     |                      No                     |    Value specified in PactSafe Group's UI    |
|     `containerId`    | The div ID that will contain your clickwrap. You should override this if you plan on displaying more than one contract on a page.                                                                                                                                                                                                                                                  |                                    string                                    |                      No                     |                 ps-clickwrap                 |
|   `disableSending`   | Turn this on if you want to manually send the agreed event instead of it automatically being sent on contract acceptance. [See documentation on manually sending the agreed event here.](https://developer.pactsafe.com/docs/get-to-know-our-javascript-library#section-3-sending-agreed-in-javascript)                                                                            |                                     bool                                     |                      No                     |                     false                    |
|     `displayAll`     | Display all contracts in the group immediately. If disabled, a contract will only be displayed if the signer hasn't accepted the latest version.                                                                                                                                                                                                                                   |                                     bool                                     |                      No                     |                     true                     |
| `displayImmediately` | Display the group's contracts as soon as the Signer ID is available. If disabled, contracts will remain hidden until you call `displayRequired()`                                                                                                                                                                                                                                  |                                     bool                                     |                      No                     |                     true                     |
|       `dynamic`      | If you would like to use dynamic render_data in your contract, you must set this to true. If this is set to true, you MUST also pass an object into the `render_data` prop.                                                                                                                                                                                                        |                                     bool                                     |                      No                     |                     false                    |
|       `filter`       | Allows you to dynamically load contracts without having to specify a group. Filter must be in the format: `id==123,456` OR `id==12345 and tags==tag1,tag2` OR `tags==tag1,tag2`. [See documentation for more information on using dynamic groups.](https://developer.pactsafe.com/docs/dynamic-groups-and-how-to-use-them)                                                         |                                    string                                    |   No, Yes if `groupKey` prop is not passed  |                   undefined                  |
|     `forceScroll`    | Disable acceptance until the signer scrolls to the bottom of each contract.                                                                                                                                                                                                                                                                                                        |                                     bool                                     |                      No                     |    Value specified in PactSafe Group's UI    |
|      `groupKey`      | PactSafe group key, this is found within the PactSafe Groups configuration.                                                                                                                                                                                                                                                                                                        |                                    string                                    |     Yes, unless `filter` prop is passed     |                   undefined                  |
|  `injectSnippetOnly` | Prop to use if you only want to inject the snippet and do not want the SDK to create and initialize a clickwrap for you.                                                                                                                                                                                                                                                           |                                    boolean                                   |                      No                     |                   false                      |
|     `psScriptUrl`    | If using a custom (or development) version of the ps.js file, pass the file URL in here. You probably won't need to use this.                                                                                                                                                                                                                                                      |                                    string                                    |                      No                     |        '//vault.pactsafe.io/ps.min.js'       |
|   `backupScriptUrl`  | If using a custom (or development) version of the ps.js file, pass the alternative backup URL in here. Otherwise, this will default to the cloudfront backup provided by the ps.js snippet. This is designed to load if the first script (defined in psScriptURL) fails to load                                                                                                    |                                    string                                    |                      No                     | ''//d3l1mqnl5xpsuc.cloudfront.net/ps.min.js' |
|     `renderData`     | Object containing the dynamic render data for your contract. [For more information on using dynamic contracts, check out this documentation.](https://developer.pactsafe.com/docs/how-to-use-smart-contracts-with-the-javascript-library)                                                                                                                                          |                                    object                                    |         If `dynamic` is set to true         |                   undefined                  |
|  `signerIdSelector`  | The ID of the `<input>` element that will be used to identify the signer.                                                                                                                                                                                                                                                                                                          |                                    string                                    |                     Yes                     |                Required Value                |
|      `signerId`      | Use this to set the signer id directly. Note that if this value is tied to a state variable updated via user input, you may hit rate limits if it is updated frequently in a short period of time. To avoid hitting a rate limit, it is best to set the value tied to this prop only when the user's input is complete as opposed to changing this value on a per character basis. |                                    string                                    | No, unless `signerIdSelector` is not passed |                   undefined                  |
|      `testMode`      | Enable this to register any contract acceptances as test data that can be cleared within the PactSafe UI                                                                                                                                                                                                                                                                           |                                     bool                                     |                      No                     |                     false                    |
|        `onAll`       | See [onAll](#onAll) below                                                                                                                                                                                                                                                                                                                                                          |                                   function                                   |                      No                     |                   undefined                  |
|       `onSent`       | See [onSent](#onSent) below                                                                                                                                                                                                                                                                                                                                                        |                                   function                                   |                      No                     |                   undefined                  |
|     `onRetrieved`    | See [onRetrieved](#onRetrieved) below                                                                                                                                                                                                                                                                                                                                              |                                   function                                   |                      No                     |                   undefined                  |
|        `onSet`       | See [onSet](#onSet) below                                                                                                                                                                                                                                                                                                                                                          |                                   function                                   |                      No                     |                   undefined                  |
|    `onSetSignerId`   | See [onSetSignerId](#onSetSignerId) below                                                                                                                                                                                                                                                                                                                                          |                                   function                                   |                      No                     |                   undefined                  |
|       `onValid`      | See [onValid](#onValid) below                                                                                                                                                                                                                                                                                                                                                      |                                   function                                   |                      No                     |                   undefined                  |
|      `onInvalid`     | See [onInvalid](#onInvalid) below                                                                                                                                                                                                                                                                                                                                                  |                                   function                                   |                      No                     |                   undefined                  |
|     `onRendered`     | See [onRendered](#onRender) below                                                                                                                                                                                                                                                                                                                                                  |                                   function                                   |                      No                     |                   undefined                  |
|     `onDisplayed`    | See [onDisplayed](#onDisplayed) below                                                                                                                                                                                                                                                                                                                                              |                                   function                                   |                      No                     |                   undefined                  |
|     `onScrolled`     | See [onScrolled](#onScrolled) below                                                                                                                                                                                                                                                                                                                                                |                                   function                                   |                      No                     |                   undefined                  |
| `onScrolledContract` | See [onScrolledContract](#onScrolledContract) below                                                                                                                                                                                                                                                                                                                                |                                   function                                   |                      No                     |                   undefined                  |
|       `onError`      | See [onError](#onError) below                                                                                                                                                                                                                                                                                                                                                      |                                   function                                   |                      No                     |                   undefined                  |                                                                          |

## <a name="callback-props"></a>PSClickwrap Triggered Event Callback Props

New in v2.0 of the React SDK we are introducing triggered event props. These props are functions that can be passed in as props and are called in response to events that happen after a user interacts with a PSClickwrap component. These function props correspond to the triggered events that can be also created using the _ps global created by the snippet. [For more information on how triggered events work within the PSSnippet and calling them without the props, you can learn about them here](https://developer.pactsafe.com/v1.1/reference#triggered-events-1). By using function props, the component will interact with the `_ps` API for you and clean up after itself when the component is destroyed.
The demo page contains various callback examples and the corresponding callback events can be observed in the console output.

As a quick example of the usage of these, if you wanted to enable a button on a valid clickwrap event, here is example code to do so using the onValid and onInvalid event props:

```JSX
import { PSClickWrap } from '@pactsafe/pactsafe-react-sdk'

...

class Example extends React.Component {
    constructor(props){
        super(props);
        this.state = { hasAgreed: false };
    }

    onValid = () => {
        this.setState({ hasAgreed: true });
    }

    onInvalid = () => {
        this.setState({ hasAgreed: false });
    }

    render () {
        return
        <div>
            <input type="email" id="userEmail" placeholder="Your Email"/>

            <PSClickWrap accessId={"YOUR_PACTSAFE_ACCESS_ID_HERE"} groupKey={"YOUR_GROUP_KEY_HERE"} signerIdSelector={"userEmail"} onValid={this.onValid} onInvalid={this.onInvalid}/>

            <button disabled={!this.state.hasAgreed} type="submit">Submit</button>
        </div>
    }
}
```

If you do not want to use event callback props, the `_ps` is loaded into the window object for you to access and set event listeners manually. Using the `_ps` global you should be able to do everything listed in our full documentation on the [PS.js library](https://developer.pactsafe.com/docs/get-to-know-our-javascript-library)

The list below describes the props names and corresponding PactSafe event:

## <a name="onAll"></a> onAll

_ps event: `all`

A special event that is triggered when any other event is triggered. The name of the original event is always the first argument passed to the callback function. The rest of the arguments will match whatever arguments were passed to the original event's callback function.

### Callback Arguments

|       Name       |        Type        |                   Description                                                                                                                       |
|:----------------:|:------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------:|
| event            | String             | The name of the event that was triggered.                                                                                                           |
|[arguments]       | Array<Any>         | All of the arguments that were passed to the original event.                                                                                        |

## <a name="onSent"></a> onSent

_ps event: `sent`

Triggered when a `send` command has been completed successfully.

### Callback Arguments

|       Name       |                 Type                    |                   Description                                                                                                                       |
|:----------------:|:---------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------:|
| event_type       | String                                  | The type of action that was sent. Supported values include: 'agreed', 'disagreed', 'displayed', 'visited' and 'updated'.                            |
| parameters       | Object                                  | An object containing the contract and group details that were sent. Contains three parameters: 'contracts', 'versions' and 'group'.                 |
| context          | Site, BrowsewrapGroup or ClickwrapGroup | The Site or Group object that initiated the send command.                                                                                           |
| payload          | String                                  | The URL-encoded payload that would have been sent to the Action API. This argument is only present when the prop `disable_sending` is set to true.  |

## <a name="onRetrieved"></a> onRetrieved

_ps event: `retrieved`

Triggered when a `retrieved` command has been completed successfully.

### Callback Arguments

|       Name       |                 Type                    |                   Description                                                                                                                       |
|:----------------:|:---------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------:|
| responseJSON     | Object                                  | The JSON response body returned by the XMLHttpRequest.                                                                                              |
| xhr              | XMLHttpRequest                          | The raw XMLHttpRequest that was sent to the Action API.                                                                                             |
| context          | Site, BrowsewrapGroup or ClickwrapGroup | The Site or Group object that initiated the retrieve command.                                                                                       |

## <a name="onSet"></a> onSet

_ps event: `set`

Triggered when a parameter is set. *Note:* This event will only be triggered for specific parameters. Supported parameters include: signer_id, signer_id_selector, form_selector. Since this is an event listener for site level properties, you should only set this on
one clickwrap on the page if multiple are mounted in order to guarantee the function is idempotent, otherwise it will be called once per clickwrap.

### Callback Arguments

|       Name       |                                 Type                           |                   Description                                                                                                                       |
|:----------------:|:--------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------:|
| parameter        | String                                                         | The name of the parameter that was set.                                                                                                             |
| value            | String, Number, Object, Function, etc.                         | The raw XMLHttpRequest that was sent to the Action API.                                                                                             |
| context          | Site, BrowsewrapGroup or ClickwrapGroup                        | The Site or Group object on which the parameter was set.                                                                                            |

## <a name="onSetSignerId"></a> onSetSignerId

_ps event: `set:signer_id`

Triggered when the signer_id parameter is set.

### Callback Arguments

|       Name       |                                 Type                           |                   Description                                                                                                                       |
|:----------------:|:--------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------:|
| value            | String                                                         | The `signer_id` that was set                                                                                                                        |
| context          | Site, BrowsewrapGroup or ClickwrapGroup                        | The Site or Group object on which the parameter was set.                                                                                            |

## <a name="onValid"></a> onValid

_ps event: `valid`

Triggered when all of the contracts in a Group have been accepted by a signer.

### Callback Arguments

|       Name       |                                 Type                           |                   Description                                                                                                                       |
|:----------------:|:--------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------:|
| parameters       | Object                                                         | An object containing the contracts and versions that belong to the Group. Contains three parameters: 'contracts', 'versions' and 'group'            |
| context          | BrowsewrapGroup or ClickwrapGroup                              | The Group object that was validated                                                                                                                 |

## <a name="onInvalid"></a> onInvalid

_ps event: `invalid`

Triggered when all of the contracts in a Group are no longer accepted by a signer. This event will be triggered if a signer un-checks a contract on a valid Group.

### Callback Arguments

|       Name       |                                 Type                           |                   Description                                                                                                                       |
|:----------------:|:--------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------:|
| parameters       | Object                                                         | An object containing the contracts and versions that belong to the Group. Contains three parameters: 'contracts', 'versions' and 'group'            |
| context          | BrowsewrapGroup or ClickwrapGroup                              | The Group object that was invalidated                                                                                                               |

## <a name="onRendered"></a> onRendered

_ps event: `rendered`

Triggered when a Group object has been rendered.

### Callback Arguments

|       Name       |                                 Type                           |                   Description                                                                                                                       |
|:----------------:|:--------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------:|
| context          | ClickwrapGroup                              | The Group object that was rendered                                                                                                               |

## <a name="onDisplayed"></a> onDisplayed

_ps event: `displayed`

Triggered when a Group object displays a contract.

### Callback Arguments

|       Name       |                                 Type                           |                   Description                                                                                                                       |
|:----------------:|:--------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------:|
| element          | HTMLElement                                                    | The contract's HTMLElement that was displayed.                                                                                                      |
| context          | ClickwrapGroup                                                 | The Group object that displayed the contract                                                                                                        |

## <a name="onScrolled"></a> onScrolled

_ps event: `scrolled`

Triggered when "Force Scroll" has been enabled in your Group Settings (or passed as a prop) and *all* of the contracts in a Group have been scrolled to the bottom of within a "Scroll" or "Embedded" Group style/layout.

### Callback Arguments

|       Name       |                                 Type                           |                   Description                                                                                                                       |
|:----------------:|:--------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------:|
| contractsElement | Object                                                         | The element containing the entire container selector of the group.                                                                                  |
| context          | ClickwrapGroup                                                 | The Group object that had all contracts scrolled to the bottom                                                                                      |

## <a name="onScrolledContract"></a> onScrolledContract

_ps event: `scrolled:contract`

Triggered when "Force Scroll" has been enabled in your Group Settings (or passed as a prop) and one of the contracts in a Group has been scrolled to the bottom of a "Scroll" or "Embedded" Group style/layout.

### Callback Arguments

|       Name       |                                 Type                           |                   Description                                                                                                                       |
|:----------------:|:--------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------:|
| contractHTML     | Object                                                         | An object containing the HTML of the contract that has been scrolled to the bottom.                                                                 |
| group            | ClickwrapGroup                                                 | The Group object that was scrolled to the bottom                                                                                                    |

## <a name="onError"></a> onError

_ps event: `error`

Triggered when a send or retrieve command encounters an error before being sent.

### Callback Arguments

|        Name         |                                 Type                           |                   Description                                                                                                                       |
|:-------------------:|:--------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------:|
| message             | String                                                         | A message describing why the error occurred.                                                                                                        |
| event_type          | String                                                         | The type of action that was being sent.                                                                                                             |
| context             | Site, BrowsewrapGroup, or ClickwrapGroup                       | The Site or Group object that initiated the command.

---

### PSBrowseWrap Props

(*Note you may have to scroll to the right to see the description*)

|        Prop            |                                Type                                |                 Default                 |                 Required?                |                                                                                                                                                        Description                                                                                                                                                       |
|:----------------------:|:------------------------------------------------------------------:|:---------------------------------------:|:----------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| `accessId`             | string                                                             | Required Value                          | Yes                                      | PactSafe site access ID                                                                                                                                                                                                                                                                                                  |
| `alwaysVisible`        | bool                                                               | false                                   | No                                       | Keep the badge visible on the page at all times. If disabled, the badge will be hidden if the target link is visible on screen.                                                                                                                                                                                          |
| `badgeText`            | string                                 | value of `linkText`         | No               | Provide alternate text for the BrowseWrap badge                                                                    |
| `groupKey`             | string                                                             | null                                    | Yes               | PactSafe group key, this is found within the PactSafe Groups configuration.                                                                                                                                                                                                                                              |
| `link`         | string                 | null            | If `openLegalCenter` is set to false    | Location of where the BrowseWrap link should redirect to, should only be used if `openLegalCenter` is set to false, otherwise the link will open the group's PactSafe legal center                                    |
| `linkText`    | string                 | null            | Yes            | The text that your BrowseWrap link will display (for example, 'Legal Center' or 'Terms of Service')                                                       |
| `openLegalCenter`      | bool                  | true            | No            | Open this group's legal center page when the badge or link is clicked. If enabled, the target link's original `href` will be replaced.                                               |
| `position`    | string.oneOf[`'middle'`, `'left'`, `'right'`, `'auto'`]         | auto          | Yes                   | Position of where the BrowseWrap badge will float within the browser window                                                               |
| `psScriptUrl`          | string                                                             | '//vault.pactsafe.io/ps.min.js'         | Yes                                      | If using a custom (or development) version of the ps.js file, pass the file URL in here. You probably won't need to use this.                                                              |

## Development (`src`, `lib` and the build process)

[See CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT License](LICENSE)

Copyright &copy; 2019 PactSafe.

[npm-badge]: https://img.shields.io/npm/v/@pactsafe/pactsafe-react-sdk.svg
[npm]: https://www.npmjs.com/package/@pactsafe/pactsafe-react-sdk
