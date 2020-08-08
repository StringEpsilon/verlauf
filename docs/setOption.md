# History.setOption

Under some circumstances, you might wish to change one of the options you've given Verlauf via the `create*History` call.

A common example for that would be the `basename` option, if that is used for user selected language.

However, not all options are safe to change at any given time - or at all. Here is an overview of options you can change and what you should keep in mind when doing so:

## General options

### basename

**Safety:** This is safe to change at basically any point.

**Caveats:** If you are reading this line, Verlauf currently has no handling for previus and current basenames. This means if the user goes back _after_ the basename setting was changed, the resulting location object will have the wrong `pathname` component. This will be fixed in a future version.

Also, beware that the basename is not applied retroactively to the current location or previous locations.

---

### getUserConfirmation

**Safety:** If you're using the legacy blocker, this is safe to change. If you want to be extra careful, make sure there is no transition waiting to be resolved. You can use `history.isInTransition()` to check.

**Caveats:** Keep in mind that this might lead to user confusion when the dialogue changes.

---

### createBlocker

**Safety:** This should work, but caution is required. Do not change this setting without first calling `history.unblock()` and making sure that any currently blocked transitions are resolved. You can use `history.isInTransition()` to check.

**Caveats:** While not necessarily an issue, keep in mind that this might lead to user experience issues, because you could create a situation where the same navigation attempt with the same starting conditions result in two or more entirely different outcomes.

---

### preserveSearch

**Safety:** Generally safe to change at any point.

**Caveats:** Like basename, keep in mind that this only applies to the current location. It also won't affect the resolved locations when going forward and backwards in history, as those are already resolved and Verlauf just takes the pathname, search and hash from the browser history (or from memory).

## History type specific options:

### forceRefresh (Browser)

**Safety:** Generally safe.

**Caveats:** Keep in mind that the next replace or push call will then immediately force refresh the application. So only switch this if you really need to.

### window (Browser, Hash)

**Safety:** This will can severe side effects, as you're basically detaching the history instance from it's current window. Do not change this at runtime, unless you really know what you're doing.

**Caveats:**
Possible side effects include:

-   `.go()`, `.goBack()`, and `goForward()` will now pop entries from the new window, resulting either in nothing happening or in unexpected locations.
-   As of 0.6.1, the BrowserHistoryAdapter and HashHistoryAdapter will reattach the onpopstate listener to the new window, resulting in invalid states when either the new or old window navigate back or forth.

### keepPage (Browser)

**Safety:** Generally safe to change.

### hashType (Hash)

**Safety:** As of version 0.6.1, this can result in malformed locations after changing whenever the user goes back to locations with the old hashtype.

<details>
<summary>Example</summary>

```js
history = createHashHistory({ hashType: "hashbang" });
history.push("/foo"); // URL is now "#!/foo"
history.setOption("hashType", "slash");
history.push("/bar"); // URL is now "#/bar"
history.goBack(); // URL is now "#!/foo" again.

// The history adapter will now try to parse that with the "slash" hash type, resulting in the path "!/foo".
```

</details>

## intialEntries (memory)

**Safety:** Unsafe. Do not use setOption with a memoryHistory. As of version 0.6.1, it will completely detach the current location from the history and re-initialize the internal history stack.

## activeEntry (memory)

**Safety:** Unsafe. Do not use setOption with a memoryHistory. As of version 0.6.1, it will completely detach the current location from the history and re-initialize the internal history stack.
