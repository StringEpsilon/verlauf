[verlauf](../README.md) › [HistoryOptions](historyoptions.md)

# Interface: HistoryOptions

Gernal options for all History variants.

## Hierarchy

* **HistoryOptions**

  ↳ [HashHistoryOptions](hashhistoryoptions.md)

  ↳ [BrowserHistoryOptions](browserhistoryoptions.md)

  ↳ [MemoryHistoryOptions](memoryhistoryoptions.md)

## Index

### Properties

* [basename](historyoptions.md#optional-basename)
* [createBlocker](historyoptions.md#optional-createblocker)
* [getUserConfirmation](historyoptions.md#optional-getuserconfirmation)
* [keyLength](historyoptions.md#optional-keylength)

## Properties

### `Optional` basename

• **basename**? : *string*

Basename that will be appended to pathnames. Default: none.

___

### `Optional` createBlocker

• **createBlocker**? : *Function*

Optional override for the history.block() behavior.

___

### `Optional` getUserConfirmation

• **getUserConfirmation**? : *[getUserConfirmation](historyoptions.md#optional-getuserconfirmation)*

Callback to ask the user to confirm or abort a page transition when blocking is active.
Default: Uses window.confirm.

___

### `Optional` keyLength

• **keyLength**? : *number*

Length of the 'key' for each history entry. Default: 6.
