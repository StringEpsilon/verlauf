import { resolveLocation } from "./utils/resolveLocation";
import { createPath } from "./utils/createPath";
import { Location, NavigationListener, HistoryAdapter, HistoryOptions, TransitionBlocker, OnAdapterLocationChange, getUserConfirmation } from "./types";
import { LegacyBlocker } from "./LegacyBlocker";
import { createKey } from "./utils/createKey";

/** @ignore */
export const ACTION = {
	PUSH: "PUSH",
	REPLACE: "REPLACE",
	POP: "POP",
};

const defaultUserConfirmation: getUserConfirmation = (message, callback) => {
	callback(window.confirm(message));
}

/**
 * History object, providing all APIs to interact with browser, hash or memory history.
 */
export class History {
	private _listeners: NavigationListener[] = [];
	private _historyAdapter: HistoryAdapter;
	private _options: HistoryOptions;
	private _blocker: TransitionBlocker;

	/** Current length of the history. Value is retrived from historyAdapter.getLength() after each action (push, replace, pop). */
	length: number;
	/** Current location. Value is retrieved from historyAdapter.getLocation() after each action (push, replace, pop). */
	location: Location;
	/** Last action performen on the history stack. Initial value is always POP. */
	action: string = ACTION.POP;

	/**
	 * Creates a new History instance.
	 *
	 * @param createAdapter The function to create a {@link HistoryAdapter} instance.
	 * @param options The options for the History instance and the HistoryAdapter.
	 */
	constructor(
		createAdapter: (listner: OnAdapterLocationChange, options: HistoryOptions) => HistoryAdapter,
		options?: HistoryOptions,
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

		this._blocker = this._options.createBlocker(this._options.getUserConfirmation);

		const historyListener = (newLocation: Location) => {
			const oldLocation = this.location;
			this._transition(newLocation, ACTION.POP,
				() => {
					this.location = newLocation;
					this._alertListeners(ACTION.POP);
				},
				() => {
					this.location = oldLocation;
					this._historyAdapter.replaceState(oldLocation,  createPath(oldLocation))
					this._alertListeners(ACTION.PUSH);
				}
			)
		}

		this._historyAdapter = createAdapter(historyListener, this._options);
		this._historyAdapter.listen();
		this.location = this._historyAdapter.getLocation();
		this.length = this._historyAdapter.getLength();


		this.listen = this.listen.bind(this);
		this.createHref = this.createHref.bind(this);
		this.push = this.push.bind(this);
		this.replace = this.replace.bind(this);
		this.block = this.block.bind(this);
		this.unblock = this.unblock.bind(this);
		this.goBack = this.goBack.bind(this);
		this.goForward = this.goForward.bind(this);
		this.go = this.go.bind(this);
	}

	private _alertListeners(action: string) {
		this._listeners.forEach(listener => listener(this.location, action))
	}

	private _transition(target: string | Location, action: string, onSuccess: Function, onFailure?: Function) {
		let newLocation = resolveLocation(this.location, target, this._options.preserveSearch);
		let isBlocked = this._blocker.isBlocked(newLocation, action)
		if (isBlocked) {
			onFailure && onFailure();
			return;
		} else {
			onSuccess();
		}
		this.action = action;
		this.length = this._historyAdapter.getLength();
	}

	/**
	 * Register a listener for all changes in location.
	 * @param listener The callback to register. Will be called with {@link Location} and action.
	 * @returns A callback to unregister the newly added listener.
	 */
	listen(listener: NavigationListener): () => void {
		this._listeners.push(listener);
		return () => {
			this.unlisten(listener);
		}
	}

	/**
	 * Removes / disables a listener.
	 *
	 * @param listener The listener to disable.
	 */
	unlisten(listener: NavigationListener): void {
		let index = this._listeners.indexOf(listener);
		if (index >= 0) {
			this._listeners.splice(index, 1);
		}
	}

	/**
	 *
	 * @param target
	 */
	createHref(target: Location): string {
		return this._historyAdapter.modifyPath(createPath(target));
	}

	/**
	 * Navigate to a location with the specified method.
	 *
	 * @param target Target location.
	 * @param state Desired state for the location
	 * @param method Specify the method to use for navigation. Either "PUSH" or "REPLACE".
	 * Default: PUSH.
	 */
	navigate(target: string | Location, state: object | null, method: string = "PUSH") {
		let newLocation = resolveLocation(this.location, target, this._options.preserveSearch);
		let newPath = createPath(newLocation);
		newLocation.state = state;

		this._transition(
			target,
			method,
			() => {
				method === ACTION.PUSH
					? this._historyAdapter.pushState(newLocation, newPath)
					: this._historyAdapter.replaceState(newLocation, newPath)
				this.location = newLocation;
				this.location.key = createKey(this._options.keyLength);
				this._alertListeners(method);
			}
		)
	}

	/**
	 * Push a new location to the history stack and navigate to it.
	 *
	 * @param target Location to go to. Either a pathname or a complete location object.
	 * @param state Optional state to push with the location.
	 */
	push(target: string | Location, state: object | null = null): void {
		this.navigate(target, state, ACTION.PUSH);
	}

	/**
	 * Replace the current location and state on the stack.
	 *
	 * @param target Location or pathname to navigate to.
	 * @param state Desired state
	 */
	replace(target: string | Location, state: object | null = null): void {
		this.navigate(target, state, ACTION.REPLACE);
	}

	/**
	 * Configure a transition block. {@link LegacyBlocker}
	 *
	 * @param args - Arguments passed to {@link LegacyBlocker.block}
	 * @returns A callback to remove the block.
	 */
	block(...args: any[]): () => void {
		return this._blocker.block.apply(this._blocker, arguments);
	}

	/**
	 * Remove the currently configured blocker.
	 */
	unblock(): void {
		this._blocker.unblock();
	}

	/**
	 * Shorthand for go(1). Go forward in history by one entry.
	 */
	goBack(): void {
		this.go(-1);
	}

	/**
	 * Shorthand for go(-1). Go forward in history by one entry.
	 */
	goForward(): void {
		this.go(1);
	}

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
	go(steps: number): void {
		this._historyAdapter.go(steps);
	}
}
