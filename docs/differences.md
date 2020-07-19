## Compatibility

Currently, the following differences in APi and behavior might affect compatibility with History@4.10:

* The default `createHashHistory` also utilizes the HTML5 history API (pushstate, replacestate). Meaning Verlauf is not compatible with IE10.
* URL encoding and decoding was dropped. Please see [here](./URI_Decoding.md) for a partial workaround.
* For typescript users, there are type incompatibilities that you'll need a workaround for.
* The blocking callback might receive a `location.key` where it would not in history 4.

## New features

* hashHistory supports location.state
* `createBrowserHistory` and `createHashHistory` accept a `window` option for interfacing with iframes. 
* New methods on the history object:
  - `navigate()` as an alternative to push and replace.
  - `unblock()` to disable the current block (if it's set).
* Typescript definitions with intellisense come with the package.
* 

## Architecture

Verlauf was rewritten from scratch with modularity in mind. A history instance will be composed as follows:

```

                                +-----------------+
                                |                 |
                           +----+ History         |
                           |    |                 |
+--------------------+     |    +-------+---------+
|                    |     |            |
| HistoryOptions     +<----+            +-------------------------+
|                    |     |            |                         |
+--------------------+     |            v                         v
                           |    +-------+---------+     +---------+----------+
                           |    |                 |     |                    |
                           +----+ HistoryAdapter  |     | TransitionBlocker  |
                                |                 |     |                    |
                                +-----------------+     +--------------------+

```

The class [History](./api/classes/history.md) provides the high level API for the `history` instances. 

The HistoryAdapter provides low level access to the browser or any other means to manipulate and or keep track of locations. This allows you to provide your own adapter, if you miss a specific quirk or feature. Within the library are the BrowserHistoryAdapter, HashHistoryAdapter and MemoryHistoryAdapter. 

You can also override specific aspects of these three adapters, as seen in the URI decoding example [here](./URI_Decoding.md)

The History class will pass on it's `options` when initiliazing the Adapter.

The TransitionBlocker is used to keep track of blocking transitions and to determine when a transition should be blocked. The default TransitionBlocker used is always the [LegacyBlocker](./api/README.md#legacyblocker)