[verlauf](../README.md) / HistoryAdapter

# Interface: HistoryAdapter

An adapter between [History](../classes/History.md) and `window.history` or custom history implementations.

## Table of contents

### Properties

- [getLength](HistoryAdapter.md#getlength)
- [getLocation](HistoryAdapter.md#getlocation)
- [go](HistoryAdapter.md#go)
- [listen](HistoryAdapter.md#listen)
- [modifyPath](HistoryAdapter.md#modifypath)
- [pushState](HistoryAdapter.md#pushstate)
- [replaceState](HistoryAdapter.md#replacestate)

## Properties

### getLength

• **getLength**: () => `number`

#### Type declaration

▸ (): `number`

Return the current size of the history stack.

##### Returns

`number`

___

### getLocation

• **getLocation**: () => [`Location`](Location.md)

#### Type declaration

▸ (): [`Location`](Location.md)

Get the current location on stack.

##### Returns

[`Location`](Location.md)

___

### go

• **go**: (`steps`: `number`) => `void`

#### Type declaration

▸ (`steps`): `void`

Go n steps backwards or forwards on the history stack

##### Parameters

| Name | Type |
| :------ | :------ |
| `steps` | `number` |

##### Returns

`void`

___

### listen

• **listen**: () => `void`

#### Type declaration

▸ (): `void`

Registers the relevant event listeners.

##### Returns

`void`

___

### modifyPath

• **modifyPath**: (`path`: `string`) => `string`

#### Type declaration

▸ (`path`): `string`

To modify a given path according to the [HistoryOptions](HistoryOptions.md) and the history type.

##### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

##### Returns

`string`

___

### pushState

• **pushState**: (`state`: [`Location`](Location.md), `target`: `string`) => `void`

#### Type declaration

▸ (`state`, `target`): `void`

Provides the method to push a new location to the stack

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Location`](Location.md) |
| `target` | `string` |

##### Returns

`void`

___

### replaceState

• **replaceState**: (`state`: [`Location`](Location.md), `target`: `string`) => `void`

#### Type declaration

▸ (`state`, `target`): `void`

Provides the method to replace the current location on the stack

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Location`](Location.md) |
| `target` | `string` |

##### Returns

`void`
