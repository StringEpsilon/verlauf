verlauf

# verlauf

## Table of contents

### Classes

- [History](classes/history.md)

### Interfaces

- [BrowserHistoryOptions](interfaces/browserhistoryoptions.md)
- [HashHistoryOptions](interfaces/hashhistoryoptions.md)
- [HistoryAdapter](interfaces/historyadapter.md)
- [HistoryOptions](interfaces/historyoptions.md)
- [Location](interfaces/location.md)
- [MemoryHistoryOptions](interfaces/memoryhistoryoptions.md)
- [TransitionBlocker](interfaces/transitionblocker.md)

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

Ƭ **NavigationListener**: (`newLocation`: [*Location*](interfaces/location.md), `action`: *string*) => *void*

Callback for history.listen(). Invoked on every navigation (push, replace, go back, go forward).

**`param`** The location that was navigated to.

**`param`** the action type associated with the navigation.

___

### OnAdapterLocationChange

Ƭ **OnAdapterLocationChange**: (`newLocation`: [*Location*](interfaces/location.md)) => *void*

Callback invoked on HistoryAdapter location changes.

___

### getUserConfirmation

Ƭ **getUserConfirmation**: (`message`: *string*, `callback`: (`confirmNavigation`: *boolean*) => *void*) => *void*

Callback to ask the user to confirm or deny a transition in LegacyBlocker.

**`param`** Message to be shown to the user.

**`param`** Must be called with `true` or `false` to confirm or deny the transition.

## Functions

### LegacyBlocker

▸ **LegacyBlocker**(`getUserConfirmation`: [*getUserConfirmation*](README.md#getuserconfirmation)): [*TransitionBlocker*](interfaces/transitionblocker.md)

Implements the blocking behavior of history@4.10.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`getUserConfirmation` | [*getUserConfirmation*](README.md#getuserconfirmation) | Function used to get confirmation from the user for a blocked transition.    |

**Returns:** [*TransitionBlocker*](interfaces/transitionblocker.md)

___

### createBrowserAdapter

▸ **createBrowserAdapter**(`historyListener`: [*OnAdapterLocationChange*](README.md#onadapterlocationchange), `options`: [*BrowserHistoryOptions*](interfaces/browserhistoryoptions.md)): [*HistoryAdapter*](interfaces/historyadapter.md)

Creates an adapter to interface the HMTL 5 history API with the History instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`historyListener` | [*OnAdapterLocationChange*](README.md#onadapterlocationchange) | Callback for history events (onpopstate).   |
`options` | [*BrowserHistoryOptions*](interfaces/browserhistoryoptions.md) | Browser History options.    |

**Returns:** [*HistoryAdapter*](interfaces/historyadapter.md)

___

### createBrowserHistory

▸ **createBrowserHistory**(`options?`: [*BrowserHistoryOptions*](interfaces/browserhistoryoptions.md)): [*History*](classes/history.md)

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

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`options?` | [*BrowserHistoryOptions*](interfaces/browserhistoryoptions.md) | Options for the History object and the browserHistory adapter.    |

**Returns:** [*History*](classes/history.md)

___

### createHashAdapter

▸ **createHashAdapter**(`historyListener`: [*OnAdapterLocationChange*](README.md#onadapterlocationchange), `options`: [*HashHistoryOptions*](interfaces/hashhistoryoptions.md)): [*HistoryAdapter*](interfaces/historyadapter.md)

Creates an adapter to interface the HMTL 5 history API with the history instance for hash based history.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`historyListener` | [*OnAdapterLocationChange*](README.md#onadapterlocationchange) | Callback for history events (onhashchange).   |
`options` | [*HashHistoryOptions*](interfaces/hashhistoryoptions.md) | Hash history options.    |

**Returns:** [*HistoryAdapter*](interfaces/historyadapter.md)

___

### createHashHistory

▸ **createHashHistory**(`options?`: [*HashHistoryOptions*](interfaces/hashhistoryoptions.md)): [*History*](classes/history.md)

Creates a History instance that keeps all location information in the hash portion of the URL.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`options?` | [*HashHistoryOptions*](interfaces/hashhistoryoptions.md) | Additional options for the hash histories behavior.    |

**Returns:** [*History*](classes/history.md)

___

### createLocation

▸ **createLocation**(`path`: *string* | [*Location*](interfaces/location.md), `state?`: *any*, `key?`: *any*, `currentLocation?`: [*Location*](interfaces/location.md), `preserveSearch?`: *boolean*): [*Location*](interfaces/location.md)

Creates a new location object for a target path / location resolving the pathnames from the current location.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`path` | *string* | [*Location*](interfaces/location.md) | - | Target path or location object to resolve to.   |
`state?` | *any* | - | Desired state of the new location   |
`key?` | *any* | - | Key for the new location.   |
`currentLocation?` | [*Location*](interfaces/location.md) | - | The location to resolve from   |
`preserveSearch` | *boolean* | false | preserve the search fragment when only the hash changes.   |

**Returns:** [*Location*](interfaces/location.md)

The resolved new location.

___

### createMemoryAdapter

▸ **createMemoryAdapter**(`historyListener`: [*OnAdapterLocationChange*](README.md#onadapterlocationchange), `options`: [*MemoryHistoryOptions*](interfaces/memoryhistoryoptions.md)): [*HistoryAdapter*](interfaces/historyadapter.md)

Creates an adapter with an internal history stack for the History instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`historyListener` | [*OnAdapterLocationChange*](README.md#onadapterlocationchange) | Callback for history "events", invoked on `go()`, as the memory adapter doesn't listen to any browser events.   |
`options` | [*MemoryHistoryOptions*](interfaces/memoryhistoryoptions.md) | Memory History options.    |

**Returns:** [*HistoryAdapter*](interfaces/historyadapter.md)

___

### createMemoryHistory

▸ **createMemoryHistory**(`options?`: [*MemoryHistoryOptions*](interfaces/memoryhistoryoptions.md)): [*History*](classes/history.md)

Creates a history instance using only internal memory for keeping track of locations.
Compatible with node.js environments.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`options?` | [*MemoryHistoryOptions*](interfaces/memoryhistoryoptions.md) | Additional options for the memory history.    |

**Returns:** [*History*](classes/history.md)

___

### createPath

▸ **createPath**(`location`: [*Location*](interfaces/location.md)): *string*

Creates a path string from a location object.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`location` | [*Location*](interfaces/location.md) | Location object to create a path from.   |

**Returns:** *string*

the path string.

___

### locationsAreEqual

▸ **locationsAreEqual**(`a`: [*Location*](interfaces/location.md), `b`: [*Location*](interfaces/location.md)): *boolean*

Check if two locations are equal.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`a` | [*Location*](interfaces/location.md) | first location   |
`b` | [*Location*](interfaces/location.md) | second location   |

**Returns:** *boolean*

true, if the locations are equal.
