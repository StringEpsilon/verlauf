interface Location {
	/** Path portion of the location. */
	pathname: string;
	/** Fragment portion, including the '#'.*/
	hash?: string;
	/** Query portion, including the '?' */
	search?: string;
	/** State value associated with the location. */
	state?: any;
	/** Unique string for this location. */
	key?: string;
}

/** Callback for history.listen(). Invoked on every navigation (push, replace, go back, go forward).
 * @param newLocation The location that was navigated to.
 * @param action the action type associated with the navigation.
 */
type NavigationListener = (
	newLocation: Location,
	action: string
) => void;

/**
 * Callback to ask the user to confirm or deny a transition in LegacyBlocker.
 * @param message Message to be shown to the user.
 * @param callback Must be called with `true` or `false` to confirm or deny the transition.
 */

type getUserConfirmation = (
	message: string,
	callback: (confirmNavigation: boolean) => void
) => void;

/** Callback invoked on HistoryAdapter location changes. */
type OnAdapterLocationChange = (newLocation: Location) => void;

/**
 * An adapter between {@link History} and `window.history` or custom history implementations.
 */
interface HistoryAdapter {
	/** Provides the method to push a new location to the stack */
	pushState: (state: Location, target: string) => void;
	/** Provides the method to replace the current location on the stack */
	replaceState: (state: Location, target: string) => void;
	/** Get the current location on stack. */
	getLocation: () => Location;
	/** Registers the relevant event listeners.  */
	listen: () => void;
	/** Go n steps backwards or forwards on the history stack */
	go: (steps: number) => void;
	/** To modify a given path according to the {@link HistoryOptions} and the history type. */
	modifyPath: (path: string) => string;
	/** Return the current size of the history stack. */
	getLength: () => number;

	/**
	 *
	 */
	setOptions: (newOptions: HistoryOptions) => void;
}

/** Gernal options for all History variants. */
interface HistoryOptions {
	/** Basename that will be appended to pathnames. Default: none. */
	basename?: string;
	/** Length of the 'key' for each history entry. Default: 6. */
	keyLength?: number;
	/**
	 * Callback to ask the user to confirm or abort a page transition when blocking is active.
	 * Default: Uses window.confirm.
	 */
	getUserConfirmation?: getUserConfirmation;
	/** Optional override for the history.block() behavior. */
	createBlocker?: Function;

	/** Tell history to preserve the search fragment when only the hash changes.
	 * Default is false.
	 */
	preserveSearch?: boolean;

	//* @ignore */
	[indexer: string]: any;
}

/** Options specific to the HashHistory. */
interface HashHistoryOptions extends HistoryOptions {
	/**
	 * Allows to change the formatting of the hash portion of the URI. Options are:
	 *
	 *  * `"slash"` - `#/your/path`
	 *  * `"noslash"` - `#your/path`
	 *  * `"hashbang"` - `#!/your/path`
	 *
	 * Default: `"slash"`.
	 */
	hashType?: "hashbang" | "noslash" | "slash";
	/**
	 * Which window object to use to interface with the HTML history API. Can be useful for iframes.
	 *
	 * Default: The global window object.
	 */
	window?: Window;
}

/** Options specific to the BrowserHistory. */
interface BrowserHistoryOptions extends HistoryOptions {
	/**
	 * Force refresh the page on every navigation.
	 * Default: false
	 */
	forceRefresh?: boolean;
	/**
	 * Which window object to use to interface with the HTML history API. Can be useful for iframes.
	 * Default: The global window object.
	 */
	window?: Window;
	/**
	 * Keep the application on the page, even if a <base/> tag points to another domain.
	 *
	 * Default: False.
	 */
	keepPage?: boolean;
}

/** Options specific to the MemoryHistory. */
interface MemoryHistoryOptions extends HistoryOptions {
	/** Preset the entries of the memory history.
	 * Default: [ "/" ].
	 */
	initialEntries?: (string | Location)[];
	/** Set the current location index from the provided initialEntries.
	 * Default: The last item or initialEntries or 0
	 */
	initialIndex?: number;
}

/**
 * History object, providing all APIs to interact with browser, hash or memory history.
 */
declare class History {
    private _listeners;
    private _historyAdapter;
    private _options;
    private _blocker;
    private _pendingTransition;
    /** Current length of the history. Value is retrived from historyAdapter.getLength() after each action (push, replace, pop). */
    length: number;
    /** Current location. Value is retrieved from historyAdapter.getLocation() after each action (push, replace, pop). */
    location: Location;
    /** Last action performen on the history stack. Initial value is always POP. */
    action: string;
    /**
     * Creates a new History instance.
     *
     * @param createAdapter The function to create a {@link HistoryAdapter} instance.
     * @param options The options for the History instance and the HistoryAdapter.
     */
    constructor(createAdapter: (listner: OnAdapterLocationChange, options: HistoryOptions) => HistoryAdapter, options?: HistoryOptions);
    private _adapterCallback;
    private _alertListeners;
    private _transition;
    /**
     * Register a listener for all changes in location.
     * @param listener The callback to register. Will be called with {@link Location} and action.
     * @returns A callback to unregister the newly added listener.
     */
    listen: (listener: NavigationListener) => (() => void);
    /**
     * Removes / disables a listener.
     *
     * @param listener The listener to disable.
     */
    unlisten: (listener: NavigationListener) => void;
    /**
     * Creates an appropriate href target string for a given location.
     * @param target
     */
    createHref: (target: Location) => string;
    /**
     * Navigate to a location with the specified method.
     *
     * @param target Target location.
     * @param state Desired state for the location
     * @param method Specify the method to use for navigation. Either "PUSH" or "REPLACE".
     * Default: PUSH.
     */
    navigate: (target: string | Location, state: object | null, method?: string) => void;
    /**
     * Push a new location to the history stack and navigate to it.
     *
     * @param target Location to go to. Either a pathname or a complete location object.
     * @param state Optional state to push with the location.
     */
    push: (target: string | Location, state?: object | null) => void;
    /**
     * Replace the current location and state on the stack.
     *
     * @param target Location or pathname to navigate to.
     * @param state Desired state
     */
    replace: (target: string | Location, state?: object | null) => void;
    /**
     * Configure a transition block. {@link LegacyBlocker}
     *
     * @param args - Arguments passed to {@link LegacyBlocker.block}
     * @returns A callback to remove the block.
     */
    block: (...args: any[]) => (() => void);
    /**
     * Remove the currently configured blocker.
     */
    unblock: () => void;
    /**
     * Shorthand for go(1). Go forward in history by one entry.
     */
    goBack: () => void;
    /**
     * Shorthand for go(-1). Go forward in history by one entry.
     */
    goForward: () => void;
    /**
     * Goes forwards or backwards in history. If the value is out of bounds, it will go as far as it can (i.E. to the first or last entry).
     *
     * @param steps Number of steps to go forward / backward.
     * @example
     * ```js
     * history.go(-10); // go ten entries back.
     *
     * history.go(10) // go ten entries forward.
     * ```
     */
    go: (steps: number) => void;
    /**
     * Change any options via it's name. Keep in mind that depending on the option and when it's changed,
     * it could have unintended sideffects.
     *
     * @param key
     * @param value
     *
     * @example
     * // Change basename:
     * history.setOptions("basename", "/en-US/");
     * history.setOptions("basename", "/en-UK/");
     * // Keep in mind that changing the basename option will not trigger a location change.
     */
    setOption: (key: string, value: any) => void;
    /**
     * Checks whether or not the history is currently processing a transition.
     *
     * @returns True, if there is a transition currently in progress.
     */
    isInTransition: () => boolean;
}

/**
 * Creates an adapter to interface the HMTL 5 history API with the history instance for hash based history.
 * @param historyListener Callback for history events (onhashchange).
 * @param options Hash history options.
 */
declare function createHashAdapter(historyListener: OnAdapterLocationChange, options: HashHistoryOptions): HistoryAdapter;
/**
 * Creates a History instance that keeps all location information in the hash portion of the URL.
 * @param options Additional options for the hash histories behavior.
 */
declare function createHashHistory(options?: HashHistoryOptions): History;

/**
 * Creates an adapter to interface the HMTL 5 history API with the History instance.
 * @param historyListener Callback for history events (onpopstate).
 * @param options Browser History options.
 */
declare function createBrowserAdapter(historyListener: OnAdapterLocationChange, options: BrowserHistoryOptions): HistoryAdapter;
/**
 * Creates a History instance with the browser history adapter.
 *
 * @param options Options for the History object and the browserHistory adapter.
 *
 * @example
 * ```js
 * const myHistory = createBrowserHistory({
 *   // Always prepend "/ui/" to all paths before pushing to history:
 * 	 basename: "/ui",
 *   // Do not do a full refresh on page transitions:
 *   forceRefresh: false,
 * });
 *
 * myHistory.push("/login"); // navigate to "/login".
 * // Thanks to the basename config option, the browser navigates to "/ui/login".
 * ```
 */
declare function createBrowserHistory(options?: BrowserHistoryOptions): History;

/**
 * Creates an adapter with an internal history stack for the History instance.
 * @param historyListener Callback for history "events", invoked on `go()`, as the memory adapter doesn't listen to any browser events.
 * @param options Memory History options.
 */
declare function createMemoryAdapter(historyListener: OnAdapterLocationChange, options: MemoryHistoryOptions): HistoryAdapter;
/**
 * Creates a history instance using only internal memory for keeping track of locations.
 * Compatible with node.js environments.
 * @param options Additional options for the memory history.
 */
declare function createMemoryHistory(options?: MemoryHistoryOptions): History;

/**
 * Creates a path string from a location object.
 *
 * @param location Location object to create a path from.
 * @returns the path string.
 */
declare function createPath(location: Location): string;

/**
 * Creates a new location object for a target path / location resolving the pathnames from the current location.
 *
 * @param path Target path or location object to resolve to.
 * @param state Desired state of the new location
 * @param key Key for the new location.
 * @param currentLocation The location to resolve from
 * @param preserveSearch preserve the search fragment when only the hash changes.
 * @returns The resolved new location.
 */
declare function createLocation(path: string | Location, state?: any, key?: any, currentLocation?: Location, preserveSearch?: boolean): Location;

/**
 * Check if two locations are equal.
 * @param a first location
 * @param b second location
 * @returns true, if the locations are equal.
 */
declare function locationsAreEqual(a: Location, b: Location): boolean;

export {
	History,
	createBrowserAdapter,
	createBrowserHistory,
	createHashAdapter,
	createHashHistory,
	createLocation,
	createMemoryAdapter,
	createMemoryHistory,
	createPath,
	locationsAreEqual,
	Location,
	NavigationListener,
	getUserConfirmation,
	OnAdapterLocationChange,
	HistoryAdapter,
	HistoryOptions,
	MemoryHistoryOptions,
	BrowserHistoryOptions,
	HashHistoryOptions,
};
