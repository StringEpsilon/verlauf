export * from "./types";
export { History } from "./History";
import { createHashAdapter, createHashHistory } from "./adapters/hashHistory";
import {
	createBrowserAdapter,
	createBrowserHistory,
} from "./adapters/browserHistory";
import {
	createMemoryAdapter,
	createMemoryHistory,
} from "./adapters/memoryHistory";
export { createPath } from "./utils/createPath";
export { createLocation } from "./utils/createLocation";
export { locationsAreEqual } from "./utils/locationsAreEqual";
export { LegacyBlocker } from "./LegacyBlocker";

export {
	createHashAdapter,
	createHashHistory,
	createBrowserAdapter,
	createBrowserHistory,
	createMemoryAdapter,
	createMemoryHistory,
};
