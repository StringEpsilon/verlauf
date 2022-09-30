[verlauf](../README.md) / History

# Class: History

History object, providing all APIs to interact with browser, hash or memory history.

## Table of contents

### Constructors

- [constructor](History.md#constructor)

### Properties

- [action](History.md#action)
- [length](History.md#length)
- [location](History.md#location)

### Methods

- [block](History.md#block)
- [createHref](History.md#createhref)
- [go](History.md#go)
- [goBack](History.md#goback)
- [goForward](History.md#goforward)
- [isInTransition](History.md#isintransition)
- [listen](History.md#listen)
- [navigate](History.md#navigate)
- [push](History.md#push)
- [replace](History.md#replace)
- [unblock](History.md#unblock)
- [unlisten](History.md#unlisten)

## Constructors

### constructor

• **new History**(`createAdapter`, `options?`)

Creates a new History instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `createAdapter` | (`listener`: [`OnAdapterLocationChange`](../README.md#onadapterlocationchange), `options`: [`HistoryOptions`](../interfaces/HistoryOptions.md)) => [`HistoryAdapter`](../interfaces/HistoryAdapter.md) | The function to create a [HistoryAdapter](../interfaces/HistoryAdapter.md) instance. |
| `options?` | [`HistoryOptions`](../interfaces/HistoryOptions.md) | The options for the History instance and the HistoryAdapter. |

## Properties

### action

• **action**: `string` = `ACTION.POP`

Last action performen on the history stack. Initial value is always POP.

___

### length

• **length**: `number`

Current length of the history. Value is retrived from historyAdapter.getLength() after each action (push, replace, pop).

___

### location

• **location**: [`Location`](../interfaces/Location.md)

Current location. Value is retrieved from historyAdapter.getLocation() after each action (push, replace, pop).

## Methods

### block

▸ **block**(...`args`): `Function`

Configure a transition block. [LegacyBlocker](../README.md#legacyblocker)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `any`[] | Arguments passed to LegacyBlocker.block |

#### Returns

`Function`

A callback to remove the block.

___

### createHref

▸ **createHref**(`target`): `string`

Creates an appropriate href target string for a given location.

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`Location`](../interfaces/Location.md) |

#### Returns

`string`

___

### go

▸ **go**(`steps`): `void`

Goes forwards or backwards in history. If the value is out of bounds, it will go as far as it can (i.E. to the first or last entry).

**`Example`**

```js
history.go(-10); // go ten entries back.

history.go(10) // go ten entries forward.
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `steps` | `number` | Number of steps to go forward / backward. |

#### Returns

`void`

___

### goBack

▸ **goBack**(): `void`

Shorthand for go(1). Go forward in history by one entry.

#### Returns

`void`

___

### goForward

▸ **goForward**(): `void`

Shorthand for go(-1). Go forward in history by one entry.

#### Returns

`void`

___

### isInTransition

▸ **isInTransition**(): `boolean`

Checks whether or not the history is currently processing a transition.

#### Returns

`boolean`

True, if there is a transition currently in progress.

___

### listen

▸ **listen**(`listener`): `Function`

Register a listener for all changes in location.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | [`NavigationListener`](../README.md#navigationlistener) | The callback to register. Will be called with [Location](../interfaces/Location.md) and action. |

#### Returns

`Function`

A callback to unregister the newly added listener.

___

### navigate

▸ **navigate**(`target`, `state`, `method?`): `void`

Navigate to a location with the specified method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `target` | `string` \| [`Location`](../interfaces/Location.md) | `undefined` | Target location. |
| `state` | ``null`` \| `object` | `undefined` | Desired state for the location |
| `method` | `string` | `ACTION.PUSH` | Specify the method to use for navigation. Either "PUSH" or "REPLACE". Default: PUSH. |

#### Returns

`void`

___

### push

▸ **push**(`target`, `state?`): `void`

Push a new location to the history stack and navigate to it.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `target` | `string` \| [`Location`](../interfaces/Location.md) | `undefined` | Location to go to. Either a pathname or a complete location object. |
| `state` | ``null`` \| `object` | `null` | Optional state to push with the location. |

#### Returns

`void`

___

### replace

▸ **replace**(`target`, `state?`): `void`

Replace the current location and state on the stack.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `target` | `string` \| [`Location`](../interfaces/Location.md) | `undefined` | Location or pathname to navigate to. |
| `state` | ``null`` \| `object` | `null` | Desired state |

#### Returns

`void`

___

### unblock

▸ **unblock**(): `void`

Remove the currently configured blocker.

#### Returns

`void`

___

### unlisten

▸ **unlisten**(`listener`): `void`

Removes / disables a listener.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | [`NavigationListener`](../README.md#navigationlistener) | The listener to disable. |

#### Returns

`void`
