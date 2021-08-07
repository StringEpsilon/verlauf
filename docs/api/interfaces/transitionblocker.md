[verlauf](../README.md) / TransitionBlocker

# Interface: TransitionBlocker

Interface for the transition blocking subsystem.

## Table of contents

### Methods

- [block](TransitionBlocker.md#block)
- [isBlocked](TransitionBlocker.md#isblocked)
- [unblock](TransitionBlocker.md#unblock)

## Methods

### block

▸ **block**(...`args`): () => `void`

Method to set a / the blocker.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `any`[] | generic arguments. |

#### Returns

`fn`

▸ (): `void`

Method to set a / the blocker.

##### Returns

`void`

___

### isBlocked

▸ **isBlocked**(`newLocation`, `action`): `boolean`

Method to dertime whether or not a given transition is blocked.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newLocation` | [`Location`](Location.md) | Target location of the pending transition. |
| `action` | `string` | Action related to the pending transition. |

#### Returns

`boolean`

___

### unblock

▸ **unblock**(...`args`): `void`

Unblock everything.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `any`[] | generic arguments |

#### Returns

`void`
