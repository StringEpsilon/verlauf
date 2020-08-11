# Verlauf - getting started

## Installation

`npm install verlauf`

## Using verlauf as a drop-in replacement

Since verlauf is API compatible, you can simply use your bundlers (and unit test suite) alias functionality to switch over. 

<details>
<summary>Webpack</summary>

```js
module.exports = {
  resolve: {
    alias: {
      history: path.resolve(__dirname, 'node_modules/verlauf'),
    }
  }
};
```

</details>

<details>
<summary>Rollup</summary>
Using https://www.npmjs.com/package/@rollup/plugin-alias:

```js
import alias from '@rollup/plugin-alias';

module.exports = {
    /* rest of your config */
    plugins: [
        alias({
            entries: [
                { find: "history", replacement: "verlauf"}
            ]
        })
    ]
}

```

</details>

<details>
<summary>Jest</summary>

```js
module.exports = {
    //...
    moduleNameMapper: {
        "history": "verlauf",
    },
}
```
</details>

If one of your dependencies relies on exports / files verlauf does not provide, for example because they import `history/LocationUtils`, you have to provide those aliases too.

## Deciding which history provider to use

For most purposes, you are good to go with one of the included history providers. These are available through:

* `createBrowserHistory()` - for directly using the browser history API on normal path names.
* `createHashHistory()` - for using the hash portion of the URL.
* `createMemoryHistory()` - Keeps the entire history in memory. Useful for testing or server side application.
