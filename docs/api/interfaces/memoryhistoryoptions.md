**[verlauf](../README.md)**

> [Globals](../README.md) / MemoryHistoryOptions

# Interface: MemoryHistoryOptions

Options specific to the MemoryHistory.

## Hierarchy

* [HistoryOptions](historyoptions.md)

  ↳ **MemoryHistoryOptions**

## Indexable

▪ [indexer: string]: any

Options specific to the MemoryHistory.

## Index

### Properties

* [basename](memoryhistoryoptions.md#basename)
* [createBlocker](memoryhistoryoptions.md#createblocker)
* [getUserConfirmation](memoryhistoryoptions.md#getuserconfirmation)
* [initialEntries](memoryhistoryoptions.md#initialentries)
* [initialIndex](memoryhistoryoptions.md#initialindex)
* [keyLength](memoryhistoryoptions.md#keylength)
* [preserveSearch](memoryhistoryoptions.md#preservesearch)

## Properties

### basename

• `Optional` **basename**: undefined \| string

*Inherited from [HistoryOptions](historyoptions.md).[basename](historyoptions.md#basename)*

Basename that will be appended to pathnames. Default: none.

___

### createBlocker

• `Optional` **createBlocker**: Function

*Inherited from [HistoryOptions](historyoptions.md).[createBlocker](historyoptions.md#createblocker)*

Optional override for the history.block() behavior.

___

### getUserConfirmation

• `Optional` **getUserConfirmation**: [getUserConfirmation](memoryhistoryoptions.md#getuserconfirmation)

*Inherited from [HistoryOptions](historyoptions.md).[getUserConfirmation](historyoptions.md#getuserconfirmation)*

Callback to ask the user to confirm or abort a page transition when blocking is active.
Default: Uses window.confirm.

___

### initialEntries

• `Optional` **initialEntries**: (string \| [Location](location.md))[]

Preset the entries of the memory history.
Default: [ "/" ].

___

### initialIndex

• `Optional` **initialIndex**: undefined \| number

Set the current location index from the provided initialEntries.
Default: The last item or initialEntries or 0

___

### keyLength

• `Optional` **keyLength**: undefined \| number

*Inherited from [HistoryOptions](historyoptions.md).[keyLength](historyoptions.md#keylength)*

Length of the 'key' for each history entry. Default: 6.

___

### preserveSearch

• `Optional` **preserveSearch**: undefined \| false \| true

*Inherited from [HistoryOptions](historyoptions.md).[preserveSearch](historyoptions.md#preservesearch)*

Tell history to preserve the search fragment when only the hash changes.
Default is false.
