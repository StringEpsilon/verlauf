![CI Build](https://github.com/StringEpsilon/verlauf/workflows/CI%20Build/badge.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/verlauf)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/verlauf)

# Verlauf

is a work in progress drop-in replacement for history version 4. This is a partial rewrite of history@4. The core functionality / architecture was written from scratch and some minor aspects were borrowed from the history codebase.

## [Documentation here](./docs/index.md)

## Goals

1. Keep API compatibility and feature parity with history version 4.
2. Offer bugfixes that can't be backported to history@4 without breaking semver.
3. Allow more flexibility in the implementation to make custom behaviors easier to add by users.

## Roadmap:

**1.0**:

* [ ] Backport bugfixes that were made in history@5, as compatability allows
* [ ] Final pass over names and calling conventions of Verlauf specific APIs
* [ ] **Ensure compatibility:**
    * [ ] pass existing history test suite
    * [x] pass react-router test suite
    * [ ] Test behavior in demos and test applications.
* [ ] Write documentation
* [ ] Write tests.

**Future**: 

* [ ] Replace all code borrowed from history.
    * [ ] createLocation()
    * [ ] Unit tests.


## Name

"Verlauf" is the german term for browser history.

## License

Verlauf is licensed under the MIT license.

The unit tests for createLocation were taken from the history v4 branch and amended. Original copyright: History contributors.

A helper function in basenameUtils (escapeRegex) was taken from the MDN and is licensed under the CC0.
