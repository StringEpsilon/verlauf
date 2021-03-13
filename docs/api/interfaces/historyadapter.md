[verlauf](../README.md) / HistoryAdapter

# Interface: HistoryAdapter

An adapter between [History](../classes/history.md) and `window.history` or custom history implementations.

## Table of contents

### Properties

- [getLength](historyadapter.md#getlength)
- [getLocation](historyadapter.md#getlocation)
- [go](historyadapter.md#go)
- [listen](historyadapter.md#listen)
- [modifyPath](historyadapter.md#modifypath)
- [pushState](historyadapter.md#pushstate)
- [replaceState](historyadapter.md#replacestate)

## Properties

### getLength

• **getLength**: () => *number*

Return the current size of the history stack.

#### Type declaration:

▸ (): *number*

**Returns:** *number*

___

### getLocation

• **getLocation**: () => [*Location*](location.md)

Get the current location on stack.

#### Type declaration:

▸ (): [*Location*](location.md)

**Returns:** [*Location*](location.md)

___

### go

• **go**: (`steps`: *number*) => *void*

Go n steps backwards or forwards on the history stack

#### Type declaration:

▸ (`steps`: *number*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`steps` | *number* |

**Returns:** *void*

___

### listen

• **listen**: () => *void*

Registers the relevant event listeners.

#### Type declaration:

▸ (): *void*

**Returns:** *void*

___

### modifyPath

• **modifyPath**: (`path`: *string*) => *string*

To modify a given path according to the [HistoryOptions](historyoptions.md) and the history type.

#### Type declaration:

▸ (`path`: *string*): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`path` | *string* |

**Returns:** *string*

___

### pushState

• **pushState**: (`state`: [*Location*](location.md), `target`: *string*) => *void*

Provides the method to push a new location to the stack

#### Type declaration:

▸ (`state`: [*Location*](location.md), `target`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`state` | [*Location*](location.md) |
`target` | *string* |

**Returns:** *void*

___

### replaceState

• **replaceState**: (`state`: [*Location*](location.md), `target`: *string*) => *void*

Provides the method to replace the current location on the stack

#### Type declaration:

▸ (`state`: [*Location*](location.md), `target`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`state` | [*Location*](location.md) |
`target` | *string* |

**Returns:** *void*
