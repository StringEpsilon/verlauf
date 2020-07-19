[verlauf](../README.md) › [History](history.md)

# Class: History

History object, providing all APIs to interact with browser, hash or memory history.

## Hierarchy

* **History**

## Index

### Constructors

* [constructor](history.md#constructor)

### Properties

* [action](history.md#action)
* [length](history.md#length)
* [location](history.md#location)

### Methods

* [block](history.md#block)
* [createHref](history.md#createhref)
* [go](history.md#go)
* [goBack](history.md#goback)
* [goForward](history.md#goforward)
* [listen](history.md#listen)
* [navigate](history.md#navigate)
* [push](history.md#push)
* [replace](history.md#replace)
* [unblock](history.md#unblock)
* [unlisten](history.md#unlisten)

## Constructors

###  constructor

\+ **new History**(`createAdapter`: function, `options?`: [HistoryOptions](../interfaces/historyoptions.md)): *[History](history.md)*

Creates a new History instance.

**Parameters:**

▪ **createAdapter**: *function*

The function to create a [HistoryAdapter](../interfaces/historyadapter.md) instance.

▸ (`listner`: [OnAdapterLocationChange](../README.md#onadapterlocationchange), `options`: [HistoryOptions](../interfaces/historyoptions.md)): *[HistoryAdapter](../interfaces/historyadapter.md)*

**Parameters:**

Name | Type |
------ | ------ |
`listner` | [OnAdapterLocationChange](../README.md#onadapterlocationchange) |
`options` | [HistoryOptions](../interfaces/historyoptions.md) |

▪`Optional`  **options**: *[HistoryOptions](../interfaces/historyoptions.md)*

The options for the History instance and the HistoryAdapter.

**Returns:** *[History](history.md)*

## Properties

###  action

• **action**: *string* = ACTION.POP

Last action performen on the history stack. Initial value is always POP.

___

###  length

• **length**: *number*

Current length of the history. Value is retrived from historyAdapter.getLength() after each action (push, replace, pop).

___

###  location

• **location**: *[Location](../interfaces/location.md)*

Current location. Value is retrieved from historyAdapter.getLocation() after each action (push, replace, pop).

## Methods

###  block

▸ **block**(...`args`: any[]): *function*

Configure a transition block. [LegacyBlocker](../README.md#legacyblocker)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...args` | any[] | Arguments passed to {@link LegacyBlocker.block} |

**Returns:** *function*

A callback to remove the block.

▸ (): *void*

___

###  createHref

▸ **createHref**(`target`: [Location](../interfaces/location.md)): *string*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`target` | [Location](../interfaces/location.md) |   |

**Returns:** *string*

___

###  go

▸ **go**(`steps`: number): *void*

Goes forwards or backwards in history. If the value is out of bounds, it will go as far as it can (i.E. to the first or last entry).

**`example`** 
```js
history.go(-10); // go ten entries back.

history.go(10) // go ten entries forward.
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`steps` | number | Number of steps to go forward / backward. |

**Returns:** *void*

___

###  goBack

▸ **goBack**(): *void*

Shorthand for go(1). Go forward in history by one entry.

**Returns:** *void*

___

###  goForward

▸ **goForward**(): *void*

Shorthand for go(-1). Go forward in history by one entry.

**Returns:** *void*

___

###  listen

▸ **listen**(`listener`: [NavigationListener](../README.md#navigationlistener)): *function*

Register a listener for all changes in location.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`listener` | [NavigationListener](../README.md#navigationlistener) | The callback to register. Will be called with [Location](../interfaces/location.md) and action. |

**Returns:** *function*

A callback to unregister the newly added listener.

▸ (): *void*

___

###  navigate

▸ **navigate**(`target`: string | [Location](../interfaces/location.md), `state`: object | null, `method`: string): *void*

Navigate to a location with the specified method.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`target` | string &#124; [Location](../interfaces/location.md) | - | Target location. |
`state` | object &#124; null | - | Desired state for the location |
`method` | string | "PUSH" | Specify the method to use for navigation. Either "PUSH" or "REPLACE". Default: PUSH.  |

**Returns:** *void*

___

###  push

▸ **push**(`target`: string | [Location](../interfaces/location.md), `state`: object | null): *void*

Push a new location to the history stack and navigate to it.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`target` | string &#124; [Location](../interfaces/location.md) | - | Location to go to. Either a pathname or a complete location object. |
`state` | object &#124; null | null | Optional state to push with the location.  |

**Returns:** *void*

___

###  replace

▸ **replace**(`target`: string | [Location](../interfaces/location.md), `state`: object | null): *void*

Replace the current location and state on the stack.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`target` | string &#124; [Location](../interfaces/location.md) | - | Location or pathname to navigate to. |
`state` | object &#124; null | null | Desired state  |

**Returns:** *void*

___

###  unblock

▸ **unblock**(): *void*

Remove the currently configured blocker.

**Returns:** *void*

___

###  unlisten

▸ **unlisten**(`listener`: [NavigationListener](../README.md#navigationlistener)): *void*

Removes / disables a listener.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`listener` | [NavigationListener](../README.md#navigationlistener) | The listener to disable.  |

**Returns:** *void*