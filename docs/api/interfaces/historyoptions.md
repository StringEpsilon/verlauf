[verlauf](../README.md) / HistoryOptions

# Interface: HistoryOptions

Gernal options for all History variants.

## Hierarchy

- **`HistoryOptions`**

  ↳ [`HashHistoryOptions`](HashHistoryOptions.md)

  ↳ [`BrowserHistoryOptions`](BrowserHistoryOptions.md)

  ↳ [`MemoryHistoryOptions`](MemoryHistoryOptions.md)

## Indexable

▪ [indexer: `string`]: `any`

## Table of contents

### Properties

- [basename](HistoryOptions.md#basename)
- [createBlocker](HistoryOptions.md#createblocker)
- [getUserConfirmation](HistoryOptions.md#getuserconfirmation)
- [keyLength](HistoryOptions.md#keylength)
- [preserveSearch](HistoryOptions.md#preservesearch)

## Properties

### basename

• `Optional` **basename**: `string`

Basename that will be appended to pathnames. Default: none.

___

### createBlocker

• `Optional` **createBlocker**: `Function`

Optional override for the history.block() behavior.

___

### getUserConfirmation

• `Optional` **getUserConfirmation**: [`getUserConfirmation`](../README.md#getuserconfirmation)

Callback to ask the user to confirm or abort a page transition when blocking is active.
Default: Uses window.confirm.

___

### keyLength

• `Optional` **keyLength**: `number`

Length of the 'key' for each history entry. Default: 6.

___

### preserveSearch

• `Optional` **preserveSearch**: `boolean`

Tell history to preserve the search fragment when only the hash changes.
Default is false.
