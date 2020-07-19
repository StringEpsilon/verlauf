[verlauf](../README.md) › [MemoryHistoryOptions](memoryhistoryoptions.md)

# Interface: MemoryHistoryOptions

Options specific to the MemoryHistory.

## Hierarchy

* [HistoryOptions](historyoptions.md)

  ↳ **MemoryHistoryOptions**

## Index

### Properties

* [basename](memoryhistoryoptions.md#optional-basename)
* [createBlocker](memoryhistoryoptions.md#optional-createblocker)
* [getUserConfirmation](memoryhistoryoptions.md#optional-getuserconfirmation)
* [initialEntries](memoryhistoryoptions.md#optional-initialentries)
* [initialIndex](memoryhistoryoptions.md#optional-initialindex)
* [keyLength](memoryhistoryoptions.md#optional-keylength)

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

• **getUserConfirmation**? : *[getUserConfirmation](memoryhistoryoptions.md#optional-getuserconfirmation)*

*Inherited from [HistoryOptions](historyoptions.md).[getUserConfirmation](historyoptions.md#optional-getuserconfirmation)*

Callback to ask the user to confirm or abort a page transition when blocking is active.
Default: Uses window.confirm.

___

### `Optional` initialEntries

• **initialEntries**? : *(string | [Location](location.md))[]*

Preset the entries of the memory history.
Default: [ "/" ].

___

### `Optional` initialIndex

• **initialIndex**? : *number*

Set the current location index from the provided initialEntries.
Default: The last item or initialEntries or 0

___

### `Optional` keyLength

• **keyLength**? : *number*

*Inherited from [HistoryOptions](historyoptions.md).[keyLength](historyoptions.md#optional-keylength)*

Length of the 'key' for each history entry. Default: 6.