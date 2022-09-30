# Changelog

## 1.0.0:

-   hashAdapter now respects the window when looking for a `<base href="...">`, similar to browserAdapter.

## 0.9.1:

-   Updated build dependencies
-   Auto-generate type definitions at build time.
-   Small documentation and readme changes

## 0.9.0

### Breaking:

-   Removed `history.setOption()`.

It's potential to break things outweighs it's usefulness. And kicking it out makes the codebase a little easier and the bundle size smaller.
If you need some of the cut functionality, some of it can be achieved by implementing your own `HistoryAdapter`

### Non-Breaking:

-   Fixed the behavior of the `keepPage` option:
    -   Strip extranious slashes.
    -   Use the window object provided in the history options.

## 0.8.0

-   Marked \_pendingTransition as private
-   Marked length, location, and action explicelty as public
-   Enabled typescript strict mode.
-   Fixed missing exports in verlauf.d.ts.

## 0.7.2

-   Fixed some edgecases in resolvePathname
-   Some performance and size optimizations for resolvePathname
-   Fixed package.json pointing at "verlauf.min.js" for browser and unpkg, after it has been renamed to "verlauf.js".

## 0.7.1 (0.7.0 had a packaging mistake)

-   Flattened package file structure. Note: if you imported from `verlauf/dist/esm` or similar, you need to chop off the "dist/" part.
-   Added createHashHistory.js, createMemoryHistory.js and createBrowserHistory.js to the package root.

## 0.6.2:

-   Removed `.bind(this)` overhead, reducing CJS and ESM bundle size by .5 KB.
-   Removed internal helper function, further reducing bundle size by ~.1 KB.

## 0.6.1:

-   Dropped unminfied bundle.
-   Build ESM bundle with ES6 target and ESNext module type.

## 0.6.0:

**Features:**

-   Added `preserveSearch` option, enables preservation the search fragment when only the hash changes.
-   Added the ability to change arbitrary options (`history.setOption()`). Use carefully!
-   Added `history.isInTransition()` as a method to check if there is an ongoing navigation.

**Bugfixes:**

-   Fixed a quirk in `push` and `replace` keeping empty hash and search when called with a Location but not when called with a string.
-   Added a workaroud for a `<base>` tag pointing to another domain / base URI so that verlauf does not leave the application.
    -   This should not cause many compat. issues, but to make sure, it's behind the option "keepPage" on createBrowserHistory.
    -   Keep in mind that anchor tags are still affected by the base tag!
-   Improved detection of a proper `<base href="..."/>` tag for createHashHistory

**Other:**

-   Simplified code in hashHistory.

## 0.5.0

Initial release.
