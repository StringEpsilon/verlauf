# Making your own Adapter

If you have a requirement not covered by verlauf, fret not! You can easily implement your own adapter - or modify an existing one - to fulfil your requirements.

In this example, we're gonna make one for a query based history. We will utilize the existing history API, just like the hash history adapter.

## Setting up the adapter

The only internals you need to look at is the [HistoryAdapter](./api/interfaces/historyadapter.md) interface. Specifically, you need to implement a function that takes a listener and an options object and returns a HistoryAdapter instance:

```js
function createQueryAdapter(listener, options) {
  return {
    /*TODO: Implement behavior.*/
  };
}
```

We will now fill the implementation with behavior, tackling the easiest first:

### getLength()

This one is rather simple to implement. Just return window.history.length:

```js
getLength() {
  return window.history.length(),
}
```

### go()

Since we decided to use the history API, this one can also just be forwarded:

```js
go(steps) {
  return window.history.go(steps),
}
```

### modifyPath

Now we're getting to specifics: modifyPath will be used to prepend the location string with the "?":

```js
modifyPath(path){
  return "?" + path;
}
```

### getLocation

getLocation will be used to get the current location from the query part of the URI. This is used when the user changes the URL manually, on go(), and of course when initializing a History instance:

```js
getLocation() {
  // First we just grab window.location.search and cut off the leading "?". 
  // Then run that through "parsePath" to get pathname, search and hash:
  let result = parsePath(
    window.location.search.substr(1)
  );
  // the location state and key are saved in the history locationstate, so we'll grab those if available:
  result.state = window.history.state?.state || null;
  result.key = window.history.state?.key || "";

  return result;
},
```

### pushState

pushState and replaceState are the heart of our adapter, really. 

```js
pushState(newLocation, target) {
  // newLocation contains everything of the target location, including key and state.
  // target is just the prebuild path string (euqal to createPath(newLocation).

  // Again, we just use the browser API here:
  window.history.pushState(
    // Save key and state to the location state. That way getLocation() can read them if need be:
    { key: newLocation.key, state: newLocation.state },
    // Verlauf doesn't have title support, so just set it empty:
    "",
    // And for the actual location, just get the path with the prepended "?": 
    this.modifyPath(target),
    // Using modifyPath here makes adding fancier features, such as basename support easier.
  );
},
```

### replaceState

replaceState() is just gonna be same, but with one method name swapped:

```js
replaceState(newLocation, target) {
  window.history.replaceState(
    { key: newLocation.key, state: newLocation.state },
    "",
    this.modifyPath(target),
  );
},
```

### listen

The listen functions job is to register the event handler the adapter needs. For queries, that will mainly be for back and forth, like for the browser history:

```js
listen(){
  // window.onpopstate will trigger when the user (or our adapter) goes backwards or forwards in history:
  window.onpopstate = () => {
    // listener will be provided by the History class as a parameter for the createQueryAdapter function. See the full function code below.
    listener(this.getLocation())
  }
}
```

### Putting it all together:

<details>
<summary>Click here to see the full function</summary>

```js
function createQueryAdapter(listener, options) {
  return {
    getLength() {
      return window.history.length(),
    },
    go(steps) {
      return window.history.go(steps),
    },
    modifyPath(path){
      return "?" + path;
    },
    getLocation() {
      let result = parsePath(
        window.location.search.substr(1)
      );
      result.state = window.history.state?.state || null;
      result.key = window.history.state?.key || "";
      return result;
    },
    pushState(newLocation, target) {
      window.history.pushState(
        { key: newLocation.key, state: newLocation.state },
        "",
        this.modifyPath(target),
      );
    },
    replaceState(newLocation, target) {
      window.history.replaceState(
        { key: newLocation.key, state: newLocation.state },
        "",
        this.modifyPath(target),
      );
    },
    listen(){
      window.onpopstate = () => {
        listener(this.getLocation())
      }
    }
  };
);
```
</details>

### Putting it to use

And finally, you want to create an actual history object you can do this:

```js
// It's as easy as calling the History constructor with your new adapter:
const queryHistory = new History(createQueryAdapter);
queryHistory.push("/new/adventures"); 
// Will dutyfully navigate us to "?/new/adventures".
```


### Addtional features

The adapter is also in charge of providing the functionality behind the following options:

* window
* basename
* hashType (or rather: queryType)

If you need support for these, just consult the createBrowserAdapter and createHashAdapter implementations of verlauf for reference. Everything else should be handled by the History class.
