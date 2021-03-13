[verlauf](../README.md) / MemoryHistoryOptions

# Interface: MemoryHistoryOptions

Options specific to the MemoryHistory.

## Hierarchy

* [*HistoryOptions*](historyoptions.md)

  ↳ **MemoryHistoryOptions**

## Table of contents

### Properties

- [basename](memoryhistoryoptions.md#basename)
- [createBlocker](memoryhistoryoptions.md#createblocker)
- [getUserConfirmation](memoryhistoryoptions.md#getuserconfirmation)
- [initialEntries](memoryhistoryoptions.md#initialentries)
- [initialIndex](memoryhistoryoptions.md#initialindex)
- [keyLength](memoryhistoryoptions.md#keylength)
- [preserveSearch](memoryhistoryoptions.md#preservesearch)

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

### initialEntries

• `Optional` **initialEntries**: (*string* \| [*Location*](location.md))[]

Preset the entries of the memory history.
Default: [ "/" ].

___

### initialIndex

• `Optional` **initialIndex**: *number*

Set the current location index from the provided initialEntries.
Default: The last item or initialEntries or 0

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
