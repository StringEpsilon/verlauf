import { createPath } from "./utils/createPath";
import {
	Location,
	NavigationListener,
	HistoryAdapter,
	HistoryOptions,
	TransitionBlocker,
	OnAdapterLocationChange,
	getUserConfirmation,
} from "./types";
import { LegacyBlocker } from "./LegacyBlocker";
import { createKey } from "./utils/createKey";
import { createLocation } from "./utils/createLocation";

/** @ignore */
export const ACTION = {
	PUSH: "PUSH",
	REPLACE: "REPLACE",
	POP: "POP",
};

const defaultUserConfirmation: getUserConfirmation = (
	message,
	callback
): void => {
	callback(window.confirm(message));
};

/**
 * History object, providing all APIs to interact with browser, hash or memory history.
 */
export class History {
	private _listeners: NavigationListener[] = [];
	private _historyAdapter: HistoryAdapter;
	private _options: HistoryOptions;
	private _blocker: TransitionBlocker;
	private _pendingTransition: boolean = false;

	/** Current length of the history. Value is retrived from historyAdapter.getLength() after each action (push, replace, pop). */
	public length: number;
	/** Current location. Value is retrieved from historyAdapter.getLocation() after each action (push, replace, pop). */
	public location: Location;
	/** Last action performen on the history stack. Initial value is always POP. */
	public action: string = ACTION.POP;

	/**
	 * Creates a new History instance.
	 *
	 * @param createAdapter The function to create a {@link HistoryAdapter} instance.
	 * @param options The options for the History instance and the HistoryAdapter.
	 */
	constructor(
		createAdapter: (
			listener: OnAdapterLocationChange,
			options: HistoryOptions
		) => HistoryAdapter,
		options?: HistoryOptions
	) {
		this._options = options || {};
		if (!this._options.basename) {
			this._options.basename = "";
		}
		if (!this._options.keyLength) {
			this._options.keyLength = 6;
		}
		if (!this._options.getUserConfirmation) {
			this._options.getUserConfirmation = defaultUserConfirmation;
		}
		if (!this._options.createBlocker) {
			this._options.createBlocker = LegacyBlocker;
		}

		this._blocker = this._options.createBlocker(
			this._options.getUserConfirmation
		);

		this._historyAdapter = createAdapter(
			this._adapterCallback,
			this._options
		);
		this._historyAdapter.listen();
		this.location = this._historyAdapter.getLocation();
		this.length = this._historyAdapter.getLength();
	}

	private _adapterCallback = (newLocation: Location) => {
		const oldLocation = this.location;
		this._transition(
			newLocation,
			ACTION.POP,
			() => {
				this.location = newLocation;
				this._alertListeners(ACTION.POP);
			},
			() => {
				this.location = oldLocation;
				this._historyAdapter.replaceState(
					oldLocation,
					createPath(oldLocation)
				);
				this._alertListeners(ACTION.PUSH);
			}
		);
	};

	private _alertListeners = (action: string) => {
		this._listeners.forEach((listener) => listener(this.location, action));
	};

	private _transition = (
		target: Location,
		action: string,
		onSuccess: Function,
		onFailure?: Function
	) => {
		this._pendingTransition = true;
		let isBlocked = this._blocker.isBlocked(target, action);
		if (isBlocked) {
			onFailure && onFailure();
			return;
		} else {
			onSuccess();
		}
		this._pendingTransition = false;
		this.action = action;
		this.length = this._historyAdapter.getLength();
	};

	/**
	 * Register a listener for all changes in location.
	 * @param listener The callback to register. Will be called with {@link Location} and action.
	 * @returns A callback to unregister the newly added listener.
	 */
	listen = (listener: NavigationListener): Function => {
		this._listeners.push(listener);
		return () => {
			this.unlisten(listener);
		};
	};

	/**
	 * Removes / disables a listener.
	 *
	 * @param listener The listener to disable.
	 */
	unlisten = (listener: NavigationListener) => {
		let index = this._listeners.indexOf(listener);
		if (index >= 0) {
			this._listeners.splice(index, 1);
		}
	};

	/**
	 * Creates an appropriate href target string for a given location.
	 * @param target
	 */
	createHref = (target: Location): string => {
		return this._historyAdapter.modifyPath(createPath(target));
	};

	/**
	 * Navigate to a location with the specified method.
	 *
	 * @param target Target location.
	 * @param state Desired state for the location
	 * @param method Specify the method to use for navigation. Either "PUSH" or "REPLACE".
	 * Default: PUSH.
	 */
	navigate = (
		target: string | Location,
		state: object | null,
		method: string = ACTION.PUSH
	) => {
		let newLocation = createLocation(
			target,
			state,
			createKey(this._options.keyLength),
			this.location,
			this._options.preserveSearch
		);
		let newPath = createPath(newLocation);
		this._transition(newLocation, method, () => {
			method === ACTION.PUSH
				? this._historyAdapter.pushState(newLocation, newPath)
				: this._historyAdapter.replaceState(newLocation, newPath);
			this.location = newLocation;
			this._alertListeners(method);
		});
	};

	/**
	 * Push a new location to the history stack and navigate to it.
	 *
	 * @param target Location to go to. Either a pathname or a complete location object.
	 * @param state Optional state to push with the location.
	 */
	push = (target: string | Location, state: object | null = null) => {
		this.navigate(target, state, ACTION.PUSH);
	};

	/**
	 * Replace the current location and state on the stack.
	 *
	 * @param target Location or pathname to navigate to.
	 * @param state Desired state
	 */
	replace = (target: string | Location, state: object | null = null) => {
		this.navigate(target, state, ACTION.REPLACE);
	};

	/**
	 * Configure a transition block. {@link LegacyBlocker}
	 *
	 * @param args - Arguments passed to {@link LegacyBlocker.block}
	 * @returns A callback to remove the block.
	 */
	block = (...args: any[]): Function => {
		return this._blocker.block.apply(this._blocker, args);
	};

	/**
	 * Remove the currently configured blocker.
	 */
	unblock = () => {
		this._blocker.unblock();
	};

	/**
	 * Shorthand for go(1). Go forward in history by one entry.
	 */
	goBack = () => {
		this.go(-1);
	};

	/**
	 * Shorthand for go(-1). Go forward in history by one entry.
	 */
	goForward = () => {
		this.go(1);
	};

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
	go = (steps: number) => {
		this._historyAdapter.go(steps);
	};

	/**
	 * Checks whether or not the history is currently processing a transition.
	 *
	 * @returns True, if there is a transition currently in progress.
	 */
	isInTransition = (): boolean => {
		return this._pendingTransition;
	};
}
