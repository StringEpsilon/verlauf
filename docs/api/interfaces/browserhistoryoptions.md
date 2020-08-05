[verlauf](../README.md) › [BrowserHistoryOptions](browserhistoryoptions.md)

# Interface: BrowserHistoryOptions

Options specific to the BrowserHistory.

## Hierarchy

* [HistoryOptions](historyoptions.md)

  ↳ **BrowserHistoryOptions**

## Index

### Properties

* [basename](browserhistoryoptions.md#optional-basename)
* [createBlocker](browserhistoryoptions.md#optional-createblocker)
* [forceRefresh](browserhistoryoptions.md#optional-forcerefresh)
* [getUserConfirmation](browserhistoryoptions.md#optional-getuserconfirmation)
* [keyLength](browserhistoryoptions.md#optional-keylength)
* [preserveSearch](browserhistoryoptions.md#optional-preservesearch)
* [window](browserhistoryoptions.md#optional-window)

## Properties

### `Optional` basename

• **basename**? : *string*

*Inherited from [HistoryOptions](historyoptions.md).[basename](historyoptions.md#optional-basename)*

Basename that will be appended to pathnames. Default: none.

___

### `Optional` createBlocker

• **createBlocker**? : *Function*

*Inherited from [HistoryOptions](historyoptions.md).[createBlocker](historyoptions.md#optional-createblocker)*

Optional override for the history.block() behavior.

___

### `Optional` forceRefresh

• **forceRefresh**? : *boolean*

Force refresh the page on every navigation.
Default: false

___

### `Optional` getUserConfirmation

• **getUserConfirmation**? : *[getUserConfirmation](browserhistoryoptions.md#optional-getuserconfirmation)*

*Inherited from [HistoryOptions](historyoptions.md).[getUserConfirmation](historyoptions.md#optional-getuserconfirmation)*

Callback to ask the user to confirm or abort a page transition when blocking is active.
Default: Uses window.confirm.

___

### `Optional` keyLength

• **keyLength**? : *number*

*Inherited from [HistoryOptions](historyoptions.md).[keyLength](historyoptions.md#optional-keylength)*

Length of the 'key' for each history entry. Default: 6.

___

### `Optional` preserveSearch

• **preserveSearch**? : *boolean*

*Inherited from [HistoryOptions](historyoptions.md).[preserveSearch](historyoptions.md#optional-preservesearch)*

Tell history to preserve the search fragment when only the hash changes.
Default is false.

___

### `Optional` window

• **window**? : *Window*

Which window object to use to interface with the HTML history API. Can be useful for iframes.
Default: The global window object.
