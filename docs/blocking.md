# Blocking transitions

## LegacyBlocker (default)

```js
// Example 1: string argument.

const unblock = history.block("Are you sure");
history.push("/foo"); // Blocked. User is prompted to confirm / deny the navigation with a `window.dialog`.

// Example 2: function argument - return string.
function shouldBlock(newLocation){
    if (newLocation === "/foo") {
        return "Are you sure you want to go to /foo?";
    }
}
const unblock = history.block(shouldBlock);

history.push("/bar); // Not blocked, because the callback returns nothing for this case.

history.push("/foo"); // Blocked. User is prompted to confirm / deny the navigation with a `window.dialog`.

// Example 2: function argument - return boolean.
function shouldBlock(newLocation){
    if (newLocation === "/restricted") {
        return true;
    }
    return false;
}
const unblock = history.block(shouldBlock);

history.push("/foo); // Not blocked.

history.push("/restricted"); // Blocked without a prompt.
```

## Custom blocker

**TODO**
