**[verlauf](../README.md)**

> [Globals](../README.md) / BrowserHistoryOptions

# Interface: BrowserHistoryOptions

Options specific to the BrowserHistory.

## Hierarchy

* [HistoryOptions](historyoptions.md)

  ↳ **BrowserHistoryOptions**

## Indexable

▪ [indexer: string]: any

Options specific to the BrowserHistory.

## Index

### Properties

* [basename](browserhistoryoptions.md#basename)
* [createBlocker](browserhistoryoptions.md#createblocker)
* [forceRefresh](browserhistoryoptions.md#forcerefresh)
* [getUserConfirmation](browserhistoryoptions.md#getuserconfirmation)
* [keepPage](browserhistoryoptions.md#keeppage)
* [keyLength](browserhistoryoptions.md#keylength)
* [preserveSearch](browserhistoryoptions.md#preservesearch)
* [window](browserhistoryoptions.md#window)

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

### forceRefresh

• `Optional` **forceRefresh**: undefined \| false \| true

Force refresh the page on every navigation.
Default: false

___

### getUserConfirmation

• `Optional` **getUserConfirmation**: [getUserConfirmation](browserhistoryoptions.md#getuserconfirmation)

*Inherited from [HistoryOptions](historyoptions.md).[getUserConfirmation](historyoptions.md#getuserconfirmation)*

Callback to ask the user to confirm or abort a page transition when blocking is active.
Default: Uses window.confirm.

___

### keepPage

• `Optional` **keepPage**: undefined \| false \| true

Keep the application on the page, even if a <base/> tag points to another domain.

Default: False.

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

___

### window

• `Optional` **window**: Window

Which window object to use to interface with the HTML history API. Can be useful for iframes.
Default: The global window object.
