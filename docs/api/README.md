verlauf

# verlauf

## Table of contents

### Classes

- [History](classes/History.md)

### Interfaces

- [BrowserHistoryOptions](interfaces/BrowserHistoryOptions.md)
- [HashHistoryOptions](interfaces/HashHistoryOptions.md)
- [HistoryAdapter](interfaces/HistoryAdapter.md)
- [HistoryOptions](interfaces/HistoryOptions.md)
- [Location](interfaces/Location.md)
- [MemoryHistoryOptions](interfaces/MemoryHistoryOptions.md)
- [TransitionBlocker](interfaces/TransitionBlocker.md)

### Type aliases

- [NavigationListener](README.md#navigationlistener)
- [OnAdapterLocationChange](README.md#onadapterlocationchange)
- [getUserConfirmation](README.md#getuserconfirmation)

### Functions

- [LegacyBlocker](README.md#legacyblocker)
- [createBrowserAdapter](README.md#createbrowseradapter)
- [createBrowserHistory](README.md#createbrowserhistory)
- [createHashAdapter](README.md#createhashadapter)
- [createHashHistory](README.md#createhashhistory)
- [createLocation](README.md#createlocation)
- [createMemoryAdapter](README.md#creatememoryadapter)
- [createMemoryHistory](README.md#creatememoryhistory)
- [createPath](README.md#createpath)
- [locationsAreEqual](README.md#locationsareequal)

## Type aliases

### NavigationListener

Ƭ **NavigationListener**: (`newLocation`: [`Location`](interfaces/Location.md), `action`: `string`) => `void`

#### Type declaration

▸ (`newLocation`, `action`): `void`

Callback for history.listen(). Invoked on every navigation (push, replace, go back, go forward).

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newLocation` | [`Location`](interfaces/Location.md) | The location that was navigated to. |
| `action` | `string` | the action type associated with the navigation. |

##### Returns

`void`

___

### OnAdapterLocationChange

Ƭ **OnAdapterLocationChange**: (`newLocation`: [`Location`](interfaces/Location.md)) => `void`

#### Type declaration

▸ (`newLocation`): `void`

Callback invoked on HistoryAdapter location changes.

##### Parameters

| Name | Type |
| :------ | :------ |
| `newLocation` | [`Location`](interfaces/Location.md) |

##### Returns

`void`

___

### getUserConfirmation

Ƭ **getUserConfirmation**: (`message`: `string`, `callback`: (`confirmNavigation`: `boolean`) => `void`) => `void`

#### Type declaration

▸ (`message`, `callback`): `void`

Callback to ask the user to confirm or deny a transition in LegacyBlocker.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | Message to be shown to the user. |
| `callback` | (`confirmNavigation`: `boolean`) => `void` | Must be called with `true` or `false` to confirm or deny the transition. |

##### Returns

`void`

## Functions

### LegacyBlocker

▸ **LegacyBlocker**(`getUserConfirmation`): [`TransitionBlocker`](interfaces/TransitionBlocker.md)

Implements the blocking behavior of history@4.10.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `getUserConfirmation` | [`getUserConfirmation`](README.md#getuserconfirmation) | Function used to get confirmation from the user for a blocked transition. |

#### Returns

[`TransitionBlocker`](interfaces/TransitionBlocker.md)

___

### createBrowserAdapter

▸ **createBrowserAdapter**(`historyListener`, `options`): [`HistoryAdapter`](interfaces/HistoryAdapter.md)

Creates an adapter to interface the HMTL 5 history API with the History instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `historyListener` | [`OnAdapterLocationChange`](README.md#onadapterlocationchange) | Callback for history events (onpopstate). |
| `options` | [`BrowserHistoryOptions`](interfaces/BrowserHistoryOptions.md) | Browser History options. |

#### Returns

[`HistoryAdapter`](interfaces/HistoryAdapter.md)

___

### createBrowserHistory

▸ **createBrowserHistory**(`options?`): [`History`](classes/History.md)

Creates a History instance with the browser history adapter.

**`example`**
```js
const myHistory = createBrowserHistory({
  // Always prepend "/ui/" to all paths before pushing to history:
	 basename: "/ui",
  // Do not do a full refresh on page transitions:
  forceRefresh: false,
});

myHistory.push("/login"); // navigate to "/login".
// Thanks to the basename config option, the browser navigates to "/ui/login".
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`BrowserHistoryOptions`](interfaces/BrowserHistoryOptions.md) | Options for the History object and the browserHistory adapter. |

#### Returns

[`History`](classes/History.md)

___

### createHashAdapter

▸ **createHashAdapter**(`historyListener`, `options`): [`HistoryAdapter`](interfaces/HistoryAdapter.md)

Creates an adapter to interface the HMTL 5 history API with the history instance for hash based history.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `historyListener` | [`OnAdapterLocationChange`](README.md#onadapterlocationchange) | Callback for history events (onhashchange). |
| `options` | [`HashHistoryOptions`](interfaces/HashHistoryOptions.md) | Hash history options. |

#### Returns

[`HistoryAdapter`](interfaces/HistoryAdapter.md)

___

### createHashHistory

▸ **createHashHistory**(`options?`): [`History`](classes/History.md)

Creates a History instance that keeps all location information in the hash portion of the URL.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`HashHistoryOptions`](interfaces/HashHistoryOptions.md) | Additional options for the hash histories behavior. |

#### Returns

[`History`](classes/History.md)

___

### createLocation

▸ **createLocation**(`path`, `state?`, `key?`, `currentLocation?`, `preserveSearch?`): [`Location`](interfaces/Location.md)

Creates a new location object for a target path / location resolving the pathnames from the current location.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `path` | `string` \| [`Location`](interfaces/Location.md) | `undefined` | Target path or location object to resolve to. |
| `state?` | `any` | `undefined` | Desired state of the new location |
| `key?` | `any` | `undefined` | Key for the new location. |
| `currentLocation?` | [`Location`](interfaces/Location.md) | `undefined` | The location to resolve from |
| `preserveSearch` | `boolean` | `false` | preserve the search fragment when only the hash changes. |

#### Returns

[`Location`](interfaces/Location.md)

The resolved new location.

___

### createMemoryAdapter

▸ **createMemoryAdapter**(`historyListener`, `options`): [`HistoryAdapter`](interfaces/HistoryAdapter.md)

Creates an adapter with an internal history stack for the History instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `historyListener` | [`OnAdapterLocationChange`](README.md#onadapterlocationchange) | Callback for history "events", invoked on `go()`, as the memory adapter doesn't listen to any browser events. |
| `options` | [`MemoryHistoryOptions`](interfaces/MemoryHistoryOptions.md) | Memory History options. |

#### Returns

[`HistoryAdapter`](interfaces/HistoryAdapter.md)

___

### createMemoryHistory

▸ **createMemoryHistory**(`options?`): [`History`](classes/History.md)

Creates a history instance using only internal memory for keeping track of locations.
Compatible with node.js environments.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`MemoryHistoryOptions`](interfaces/MemoryHistoryOptions.md) | Additional options for the memory history. |

#### Returns

[`History`](classes/History.md)

___

### createPath

▸ **createPath**(`location`): `string`

Creates a path string from a location object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `location` | [`Location`](interfaces/Location.md) | Location object to create a path from. |

#### Returns

`string`

the path string.

___

### locationsAreEqual

▸ **locationsAreEqual**(`a`, `b`): `boolean`

Check if two locations are equal.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | [`Location`](interfaces/Location.md) | first location |
| `b` | [`Location`](interfaces/Location.md) | second location |

#### Returns

`boolean`

true, if the locations are equal.
