[verlauf](../README.md) / MemoryHistoryOptions

# Interface: MemoryHistoryOptions

Options specific to the MemoryHistory.

## Hierarchy

- [`HistoryOptions`](HistoryOptions.md)

  ↳ **`MemoryHistoryOptions`**

## Table of contents

### Properties

- [basename](MemoryHistoryOptions.md#basename)
- [createBlocker](MemoryHistoryOptions.md#createblocker)
- [getUserConfirmation](MemoryHistoryOptions.md#getuserconfirmation)
- [initialEntries](MemoryHistoryOptions.md#initialentries)
- [initialIndex](MemoryHistoryOptions.md#initialindex)
- [keyLength](MemoryHistoryOptions.md#keylength)
- [preserveSearch](MemoryHistoryOptions.md#preservesearch)

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

### getUserConfirmation

• `Optional` **getUserConfirmation**: [`getUserConfirmation`](../README.md#getuserconfirmation)

Callback to ask the user to confirm or abort a page transition when blocking is active.
Default: Uses window.confirm.

#### Inherited from

[HistoryOptions](HistoryOptions.md).[getUserConfirmation](HistoryOptions.md#getuserconfirmation)

___

### initialEntries

• `Optional` **initialEntries**: (`string` \| [`Location`](Location.md))[]

Preset the entries of the memory history.
Default: [ "/" ].

___

### initialIndex

• `Optional` **initialIndex**: `number`

Set the current location index from the provided initialEntries.
Default: The last item or initialEntries or 0

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
