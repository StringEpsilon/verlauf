[verlauf](../README.md) / BrowserHistoryOptions

# Interface: BrowserHistoryOptions

Options specific to the BrowserHistory.

## Hierarchy

* [*HistoryOptions*](historyoptions.md)

  ↳ **BrowserHistoryOptions**

## Table of contents

### Properties

- [basename](browserhistoryoptions.md#basename)
- [createBlocker](browserhistoryoptions.md#createblocker)
- [forceRefresh](browserhistoryoptions.md#forcerefresh)
- [getUserConfirmation](browserhistoryoptions.md#getuserconfirmation)
- [keepPage](browserhistoryoptions.md#keeppage)
- [keyLength](browserhistoryoptions.md#keylength)
- [preserveSearch](browserhistoryoptions.md#preservesearch)
- [window](browserhistoryoptions.md#window)

## Properties

### basename

• `Optional` **basename**: *string*

Basename that will be appended to pathnames. Default: none.

Inherited from: [HistoryOptions](historyoptions.md).[basename](historyoptions.md#basename)

___

### createBlocker

• `Optional` **createBlocker**: Function

Optional override for the history.block() behavior.

Inherited from: [HistoryOptions](historyoptions.md).[createBlocker](historyoptions.md#createblocker)

___

### forceRefresh

• `Optional` **forceRefresh**: *boolean*

Force refresh the page on every navigation.
Default: false

___

### getUserConfirmation

• `Optional` **getUserConfirmation**: [*getUserConfirmation*](../README.md#getuserconfirmation)

Callback to ask the user to confirm or abort a page transition when blocking is active.
Default: Uses window.confirm.

Inherited from: [HistoryOptions](historyoptions.md).[getUserConfirmation](historyoptions.md#getuserconfirmation)

___

### keepPage

• `Optional` **keepPage**: *boolean*

Keep the application on the page, even if a <base/> tag points to another domain.

Default: False.

___

### keyLength

• `Optional` **keyLength**: *number*

Length of the 'key' for each history entry. Default: 6.

Inherited from: [HistoryOptions](historyoptions.md).[keyLength](historyoptions.md#keylength)

___

### preserveSearch

• `Optional` **preserveSearch**: *boolean*

Tell history to preserve the search fragment when only the hash changes.
Default is false.

Inherited from: [HistoryOptions](historyoptions.md).[preserveSearch](historyoptions.md#preservesearch)

___

### window

• `Optional` **window**: Window

Which window object to use to interface with the HTML history API. Can be useful for iframes.
Default: The global window object.
