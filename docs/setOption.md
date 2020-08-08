# History.setOption

Under some circumstances, you might wish to change one of the options you've given Verlauf via the `create*History` call.

A common example for that would be the `basename` option, if that is used for user selected language.

However, not all options are safe to change at any given time - or at all.

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
