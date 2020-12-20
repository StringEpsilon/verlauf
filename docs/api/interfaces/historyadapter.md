**[verlauf](../README.md)**

> [Globals](../README.md) / HistoryAdapter

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

### getLength

•  **getLength**: () => number

Return the current size of the history stack.

___

### getLocation

•  **getLocation**: () => [Location](location.md)

Get the current location on stack.

___

### go

•  **go**: (steps: number) => void

Go n steps backwards or forwards on the history stack

___

### listen

•  **listen**: () => void

Registers the relevant event listeners.

___

### modifyPath

•  **modifyPath**: (path: string) => string

To modify a given path according to the [HistoryOptions](historyoptions.md) and the history type.

___

### pushState

•  **pushState**: (state: [Location](location.md), target: string) => void

Provides the method to push a new location to the stack

___

### replaceState

•  **replaceState**: (state: [Location](location.md), target: string) => void

Provides the method to replace the current location on the stack

___

### setOptions

•  **setOptions**: (newOptions: [HistoryOptions](historyoptions.md)) => void
