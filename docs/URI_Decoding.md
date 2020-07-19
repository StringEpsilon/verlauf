# URI Decoding and encoding

If, for some reason, you rely on the old encoding and decoding behavior of History 4 and earlier, you can restore some compatibilty by adding a layer between the History instance and the HistoryAdapter you're using.

```ts
// Before workaround:
import { createBrowserHistory } from "verlauf";
const history = createBrowserHistory(/* + your options*/);

// after workaround:
import { History, createBrowserAdapter } from "verlauf";

const createEncodeDecodeAdapter = (historyListener: OnHistoryChange, options: BrowserHistoryOptions) : HistoryAdapter => {
  const wrappedAdapter = createBrowserAdapter(historyListener, options);

  const getLocation = wrappedAdapter.getLocation;
  const modifyPath = wrappedAdapter.modifyPath;

  wrappedAdapter.getLocation = (): ILocation {
    const result = getLocation();
    // History used to decode the entire URL before splitting. You can do that here too, but you'd have to override getLocation() completely.
    // Decoding each part in sequence can lead to some oddities. Beware.
    result.pathname = decodeURI(result.pathname);
    result.search = decodeURI(result.search);
    result.hash = decodeURI(result.hash);
    return result;
  },

  wrappedAdapter.modifyPath = (path: string): string => {
    // modifyPath() is always called before pushing or replacing a path. It's also called by verlauf.createHref().
    return encodeURI(modifyPath(path));
  }

  return wrappedAdapter;
}

const history = new History(createEncodeDecodeAdapter, { /* + your options*/ });
```

Keep in mind that you will still face some compatibility issues because createLocation() does not do the encoding and decoding. 

For more issues on the subject as a whole, see https://github.com/ReactTraining/history/issues/505 .
