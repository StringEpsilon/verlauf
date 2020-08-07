[verlauf](../README.md) › [HistoryAdapter](historyadapter.md)

# Interface: HistoryAdapter

An adapter between [History](../classes/history.md) and `window.history` or custom history implementations.

## Hierarchy

* **HistoryAdapter**

## Index

### Properties

* [getLength](historyadapter.md#getlength)
* [getLocation](historyadapter.md#getlocation)
* [go](historyadapter.md#go)
* [listen](historyadapter.md#listen)
* [modifyPath](historyadapter.md#modifypath)
* [pushState](historyadapter.md#pushstate)
* [replaceState](historyadapter.md#replacestate)
* [setOptions](historyadapter.md#setoptions)

## Properties

###  getLength

• **getLength**: *function*

Return the current size of the history stack.

#### Type declaration:

▸ (): *number*

___

###  getLocation

• **getLocation**: *function*

Get the current location on stack.

#### Type declaration:

▸ (): *[Location](location.md)*

___

###  go

• **go**: *function*

Go n steps backwards or forwards on the history stack

#### Type declaration:

▸ (`steps`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`steps` | number |

___

###  listen

• **listen**: *function*

Registers the relevant event listeners.

#### Type declaration:

▸ (): *void*

___

###  modifyPath

• **modifyPath**: *function*

To modify a given path according to the [HistoryOptions](historyoptions.md) and the history type.

#### Type declaration:

▸ (`path`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

___

###  pushState

• **pushState**: *function*

Provides the method to push a new location to the stack

#### Type declaration:

▸ (`state`: [Location](location.md), `target`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`state` | [Location](location.md) |
`target` | string |

___

###  replaceState

• **replaceState**: *function*

Provides the method to replace the current location on the stack

#### Type declaration:

▸ (`state`: [Location](location.md), `target`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`state` | [Location](location.md) |
`target` | string |

___

###  setOptions

• **setOptions**: *function*

#### Type declaration:

▸ (`newOptions`: [HistoryOptions](historyoptions.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newOptions` | [HistoryOptions](historyoptions.md) |
