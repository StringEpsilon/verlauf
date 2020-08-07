[verlauf](../README.md) › [HashHistoryOptions](hashhistoryoptions.md)

# Interface: HashHistoryOptions

Options specific to the HashHistory.

## Hierarchy

* [HistoryOptions](historyoptions.md)

  ↳ **HashHistoryOptions**

## Indexable

* \[ **indexer**: *string*\]: any

Options specific to the HashHistory.

## Index

### Properties

* [basename](hashhistoryoptions.md#optional-basename)
* [createBlocker](hashhistoryoptions.md#optional-createblocker)
* [getUserConfirmation](hashhistoryoptions.md#optional-getuserconfirmation)
* [hashType](hashhistoryoptions.md#optional-hashtype)
* [keyLength](hashhistoryoptions.md#optional-keylength)
* [preserveSearch](hashhistoryoptions.md#optional-preservesearch)
* [window](hashhistoryoptions.md#optional-window)

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

### `Optional` getUserConfirmation

• **getUserConfirmation**? : *[getUserConfirmation](hashhistoryoptions.md#optional-getuserconfirmation)*

*Inherited from [HistoryOptions](historyoptions.md).[getUserConfirmation](historyoptions.md#optional-getuserconfirmation)*

Callback to ask the user to confirm or abort a page transition when blocking is active.
Default: Uses window.confirm.

___

### `Optional` hashType

• **hashType**? : *"hashbang" | "noslash" | "slash"*

Allows to change the formatting of the hash portion of the URI. Options are:

 * `"slash"` - `#/your/path`
 * `"noslash"` - `#your/path`
 * `"hashbang"` - `#!/your/path`

Default: `"slash"`.

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
