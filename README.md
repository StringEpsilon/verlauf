![CI Build](https://github.com/StringEpsilon/verlauf/workflows/CI%20Build/badge.svg)
[![npm bundle size](https://badgen.net/bundlephobia/min/verlauf@latest)](https://bundlephobia.com/result?p=verlauf)
[![npm bundle size](https://badgen.net/bundlephobia/minzip/verlauf@latest)](https://bundlephobia.com/result?p=verlauf)

# Verlauf

Is a (work in progress) reimplementation of history version 4, aiming to keep compatibility while still offering new features and bugfixes that can't be added to history@4 without breaking semantic versioning.

Major differences:

-   Modular. You can implement your own middleware to interface with the browser history.
-   Removed URL encoding and decoding, though you can work around that, if you need to.
-   You can implement your own transition blocking logic.
-   Single file bundling. Meaning you can't import `verlauf/createBrowserHistory`.

Detailed documentation can [be found here](./docs/differences.md), including all the minor differences in behavior.

## [Documentation here](./docs/index.md)

## Roadmap:

**1.0**:

-   [ ] Write tests for setOption()
-   [ ] Backport bugfixes that were made in history@5, as compatability allows
    -   [ ] Correctly parse and utilize `<base/>` tag in hashHistoryAdapter
-   [ ] Final pass over names and calling conventions of Verlauf specific APIs
-   [ ] **Ensure compatibility:**
    -   [ ] pass existing history test suite
    -   [x] pass react-router test suite
    -   [ ] Test behavior in demos and test applications.
-   [ ] Complete documentation.
-   [ ] Complete unit test coverage.

**Future**:

-   [ ] Replace all code borrowed from history.
    -   [ ] Unit tests.
-   Make preserveSearch = true the default.

## Name

"Verlauf" is the german term for browser history.

## License

Verlauf is licensed under the MIT license.

The unit tests for createLocation were taken from the history v4 branch and amended. Original copyright: History contributors.

A helper function in basenameUtils (escapeRegex) was taken from the MDN and is licensed under the CC0.
