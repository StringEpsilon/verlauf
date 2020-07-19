# Verlauf - getting started

## Installation

`npm install verlauf`

## Deciding which history provider to use

For most purposes, you are good to go with one of the included history providers. These are available through:

* `createBrowserHistory()` - for directly using the browser history API on normal path names.
* `createHashHistory()` - for using the hash portion of the URL.
* `createMemoryHistory()` - Keeps the entire history in memory. Useful for testing or server side application.
