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

const defaultUserConfirmation: getUserConfirmation = (message, callback) => {
	callback(window.confirm(message));
};

/**
 * History object, providing all APIs to interact with browser, hash or memory history.
 */
export declare interface History {
	/** Current length of the history. Value is retrived from historyAdapter.getLength() after each action (push, replace, pop). */
	length: number;
	/** Current location. Value is retrieved from historyAdapter.getLocation() after each action (push, replace, pop). */
	location: Location;
	/** Last action performen on the history stack. Initial value is always POP. */
	action: string;

	/** @ignore */
	_adapterCallback: (newLocation: Location) => void;
	/** @ignore */
	_alertListeners: (action: string) => void;
	/** @ignore */
	_transition: (
		target: Location,
		action: string,
		onSuccess: Function,
		onFailure?: Function
	) => void;
	/**
	 * Register a listener for all changes in location.
	 * @param listener The callback to register. Will be called with {@link Location} and action.
	 * @returns A callback to unregister the newly added listener.
	 */
	listen: (listener: NavigationListener) => () => void;
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
	navigate: (
		target: string | Location,
		state: object | null,
		method?: string
	) => void;
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
	block: (...args: any[]) => () => void;
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
	 * Checks whether or not the history is currently processing a transition.
	 *
	 * @returns True, if there is a transition currently in progress.
	 */
	isInTransition: () => boolean;

	_historyAdapter: HistoryAdapter;
}

/**
 * Creates a new History instance.
 *
 * @param createAdapter The function to create a {@link HistoryAdapter} instance.
 * @param options The options for the History instance and the HistoryAdapter.
 */
export const History = (function (
	this: History,
	createAdapter: (
		listener: OnAdapterLocationChange,
		options: HistoryOptions
	) => HistoryAdapter,
	options?: HistoryOptions
) {
	let _listeners: NavigationListener[] = [];
	let _options: HistoryOptions;
	let _blocker: TransitionBlocker;
	let _pendingTransition: boolean = false;

	_options = options || {};
	if (!_options.basename) {
		_options.basename = "";
	}
	if (!_options.keyLength) {
		_options.keyLength = 6;
	}
	if (!_options.getUserConfirmation) {
		_options.getUserConfirmation = defaultUserConfirmation;
	}
	if (!_options.createBlocker) {
		_options.createBlocker = LegacyBlocker;
	}

	_blocker = _options.createBlocker(_options.getUserConfirmation);

	this.length = 0;
	this.action = ACTION.POP;

	this._alertListeners = (action: string) => {
		_listeners.forEach((listener) => listener(this.location, action));
	};
	this._transition = (
		target: Location,
		action: string,
		onSuccess: Function,
		onFailure?: Function
	) => {
		_pendingTransition = true;
		let isBlocked = _blocker.isBlocked(target, action);
		if (isBlocked) {
			onFailure && onFailure();
			return;
		} else {
			onSuccess();
		}
		_pendingTransition = false;
		this.action = action;
		this.length = this._historyAdapter.getLength();
	};

	this._adapterCallback = (newLocation: Location) => {
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

	this.listen = (listener: NavigationListener): (() => void) => {
		_listeners.push(listener);
		return () => {
			this.unlisten(listener);
		};
	};

	this.unlisten = (listener: NavigationListener): void => {
		let index = _listeners.indexOf(listener);
		if (index >= 0) {
			_listeners.splice(index, 1);
		}
	};

	this.createHref = (target: Location): string => {
		return this._historyAdapter.modifyPath(createPath(target));
	};

	this.navigate = (
		target: string | Location,
		state: object | null,
		method: string = ACTION.PUSH
	) => {
		let newLocation = createLocation(
			target,
			state,
			createKey(_options.keyLength),
			this.location,
			_options.preserveSearch
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

	this.push = (
		target: string | Location,
		state: object | null = null
	): void => {
		this.navigate(target, state, ACTION.PUSH);
	};

	this.replace = (
		target: string | Location,
		state: object | null = null
	): void => {
		this.navigate(target, state, ACTION.REPLACE);
	};

	this.block = (...args: any[]): (() => void) => {
		return _blocker.block.apply(_blocker, args);
	};

	this.unblock = (): void => {
		_blocker.unblock();
	};

	this.goBack = (): void => {
		this.go(-1);
	};

	this.goForward = (): void => {
		this.go(1);
	};

	this.go = (steps: number): void => {
		this._historyAdapter.go(steps);
	};

	this.isInTransition = (): boolean => {
		return _pendingTransition;
	};

	// this._adapterCallback = this._adapterCallback.bind(this);
	this._historyAdapter = createAdapter(this._adapterCallback, _options);
	this._historyAdapter.listen();
	this.location = this._historyAdapter.getLocation();
	this.length = this._historyAdapter.getLength();
	return this;
} as any) as {
	new (
		createAdapter: (
			listner: OnAdapterLocationChange,
			options: HistoryOptions
		) => HistoryAdapter,
		options?: HistoryOptions
	): History;
};
