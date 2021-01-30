export interface Location {
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
export type NavigationListener = (
	newLocation: Location,
	action: string
) => void;

/**
 * Callback to ask the user to confirm or deny a transition in LegacyBlocker.
 * @param message Message to be shown to the user.
 * @param callback Must be called with `true` or `false` to confirm or deny the transition.
 */

export type getUserConfirmation = (
	message: string,
	callback: (confirmNavigation: boolean) => void
) => void;

/** Callback invoked on HistoryAdapter location changes. */
export type OnAdapterLocationChange = (newLocation: Location) => void;

/**
 * Interface for the transition blocking subsystem.
 */
export interface TransitionBlocker {
	/**
	 * Method to set a / the blocker.
	 * @param args generic arguments.
	 */
	block(...args: any[]): () => void;
	/**
	 * Unblock everything.
	 * @param args generic arguments
	 */
	unblock(...args: any[]): void;
	/**
	 * Method to dertime whether or not a given transition is blocked.
	 * @param newLocation Target location of the pending transition.
	 * @param action Action related to the pending transition.
	 */
	isBlocked(newLocation: Location, action: string): boolean;
}

/**
 * An adapter between {@link History} and `window.history` or custom history implementations.
 */
export interface HistoryAdapter {
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
}

/** Gernal options for all History variants. */
export interface HistoryOptions {
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
export interface HashHistoryOptions extends HistoryOptions {
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
export interface BrowserHistoryOptions extends HistoryOptions {
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
export interface MemoryHistoryOptions extends HistoryOptions {
	/** Preset the entries of the memory history.
	 * Default: [ "/" ].
	 */
	initialEntries?: (string | Location)[];
	/** Set the current location index from the provided initialEntries.
	 * Default: The last item or initialEntries or 0
	 */
	initialIndex?: number;
}
