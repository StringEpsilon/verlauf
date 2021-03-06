[verlauf](../README.md) / HistoryOptions

# Interface: HistoryOptions

Gernal options for all History variants.

## Hierarchy

* **HistoryOptions**

  ↳ [*HashHistoryOptions*](hashhistoryoptions.md)

  ↳ [*BrowserHistoryOptions*](browserhistoryoptions.md)

  ↳ [*MemoryHistoryOptions*](memoryhistoryoptions.md)

## Indexable

▪ [indexer: *string*]: *any*

Gernal options for all History variants.

## Table of contents

### Properties

- [basename](historyoptions.md#basename)
- [createBlocker](historyoptions.md#createblocker)
- [getUserConfirmation](historyoptions.md#getuserconfirmation)
- [keyLength](historyoptions.md#keylength)
- [preserveSearch](historyoptions.md#preservesearch)

## Properties

### basename

• `Optional` **basename**: *string*

Basename that will be appended to pathnames. Default: none.

___

### createBlocker

• `Optional` **createBlocker**: Function

Optional override for the history.block() behavior.

___

### getUserConfirmation

• `Optional` **getUserConfirmation**: [*getUserConfirmation*](../README.md#getuserconfirmation)

Callback to ask the user to confirm or abort a page transition when blocking is active.
Default: Uses window.confirm.

___

### keyLength

• `Optional` **keyLength**: *number*

Length of the 'key' for each history entry. Default: 6.

___

### preserveSearch

• `Optional` **preserveSearch**: *boolean*

Tell history to preserve the search fragment when only the hash changes.
Default is false.
