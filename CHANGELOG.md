# Changelog

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
