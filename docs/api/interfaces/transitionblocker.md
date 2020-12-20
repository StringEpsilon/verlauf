**[verlauf](../README.md)**

> [Globals](../README.md) / TransitionBlocker

# Interface: TransitionBlocker

Interface for the transition blocking subsystem.

## Hierarchy

* **TransitionBlocker**

## Index

### Methods

* [block](transitionblocker.md#block)
* [isBlocked](transitionblocker.md#isblocked)
* [unblock](transitionblocker.md#unblock)

## Methods

### block

▸ **block**(...`args`: any[]): function

Method to set a / the blocker.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`...args` | any[] | generic arguments.  |

**Returns:** function

___

### isBlocked

▸ **isBlocked**(`newLocation`: [Location](location.md), `action`: string): boolean

Method to dertime whether or not a given transition is blocked.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`newLocation` | [Location](location.md) | Target location of the pending transition. |
`action` | string | Action related to the pending transition.  |

**Returns:** boolean

___

### unblock

▸ **unblock**(...`args`: any[]): void

Unblock everything.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`...args` | any[] | generic arguments  |

**Returns:** void
