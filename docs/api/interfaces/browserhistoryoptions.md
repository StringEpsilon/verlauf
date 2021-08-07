[verlauf](../README.md) / BrowserHistoryOptions

# Interface: BrowserHistoryOptions

Options specific to the BrowserHistory.

## Hierarchy

- [`HistoryOptions`](HistoryOptions.md)

  ↳ **`BrowserHistoryOptions`**

## Table of contents

### Properties

- [basename](BrowserHistoryOptions.md#basename)
- [createBlocker](BrowserHistoryOptions.md#createblocker)
- [forceRefresh](BrowserHistoryOptions.md#forcerefresh)
- [getUserConfirmation](BrowserHistoryOptions.md#getuserconfirmation)
- [keepPage](BrowserHistoryOptions.md#keeppage)
- [keyLength](BrowserHistoryOptions.md#keylength)
- [preserveSearch](BrowserHistoryOptions.md#preservesearch)
- [window](BrowserHistoryOptions.md#window)

## Properties

### basename

• `Optional` **basename**: `string`

Basename that will be appended to pathnames. Default: none.

#### Inherited from

[HistoryOptions](HistoryOptions.md).[basename](HistoryOptions.md#basename)

___

### createBlocker

• `Optional` **createBlocker**: `Function`

Optional override for the history.block() behavior.

#### Inherited from

[HistoryOptions](HistoryOptions.md).[createBlocker](HistoryOptions.md#createblocker)

___

### forceRefresh

• `Optional` **forceRefresh**: `boolean`

Force refresh the page on every navigation.
Default: false

___

### getUserConfirmation

• `Optional` **getUserConfirmation**: [`getUserConfirmation`](../README.md#getuserconfirmation)

Callback to ask the user to confirm or abort a page transition when blocking is active.
Default: Uses window.confirm.

#### Inherited from

[HistoryOptions](HistoryOptions.md).[getUserConfirmation](HistoryOptions.md#getuserconfirmation)

___

### keepPage

• `Optional` **keepPage**: `boolean`

Keep the application on the page, even if a <base/> tag points to another domain.

Default: False.

___

### keyLength

• `Optional` **keyLength**: `number`

Length of the 'key' for each history entry. Default: 6.

#### Inherited from

[HistoryOptions](HistoryOptions.md).[keyLength](HistoryOptions.md#keylength)

___

### preserveSearch

• `Optional` **preserveSearch**: `boolean`

Tell history to preserve the search fragment when only the hash changes.
Default is false.

#### Inherited from

[HistoryOptions](HistoryOptions.md).[preserveSearch](HistoryOptions.md#preservesearch)

___

### window

• `Optional` **window**: `Window`

Which window object to use to interface with the HTML history API. Can be useful for iframes.
Default: The global window object.
