[verlauf](../README.md) / HashHistoryOptions

# Interface: HashHistoryOptions

Options specific to the HashHistory.

## Hierarchy

* [*HistoryOptions*](historyoptions.md)

  ↳ **HashHistoryOptions**

## Index

### Properties

* [basename](hashhistoryoptions.md#basename)
* [createBlocker](hashhistoryoptions.md#createblocker)
* [getUserConfirmation](hashhistoryoptions.md#getuserconfirmation)
* [hashType](hashhistoryoptions.md#hashtype)
* [keyLength](hashhistoryoptions.md#keylength)
* [preserveSearch](hashhistoryoptions.md#preservesearch)
* [window](hashhistoryoptions.md#window)

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

### getUserConfirmation

• `Optional` **getUserConfirmation**: [*getUserConfirmation*](../README.md#getuserconfirmation)

Callback to ask the user to confirm or abort a page transition when blocking is active.
Default: Uses window.confirm.

Inherited from: [HistoryOptions](historyoptions.md).[getUserConfirmation](historyoptions.md#getuserconfirmation)

___

### hashType

• `Optional` **hashType**: *hashbang* \| *noslash* \| *slash*

Allows to change the formatting of the hash portion of the URI. Options are:

 * `"slash"` - `#/your/path`
 * `"noslash"` - `#your/path`
 * `"hashbang"` - `#!/your/path`

Default: `"slash"`.

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
