import { History } from "../History";
import {
	HistoryAdapter,
	Location,
	OnAdapterLocationChange,
	BrowserHistoryOptions,
} from "../types";
import {
	stripBasename,
	addLeadingSlash,
	stripTrailingSlash,
} from "../basenameUtils";

/** @ignore */
function getOrigin(): string {
	if (!document.querySelector("base[href]")) {
		return "";
	}
	return document.location.origin;
}

/**
 * Creates an adapter to interface the HMTL 5 history API with the History instance.
 * @param historyListener Callback for history events (onpopstate).
 * @param options Browser History options.
 */
export function createBrowserAdapter(
	historyListener: OnAdapterLocationChange,
	options: BrowserHistoryOptions
): HistoryAdapter {
	let basename: string;
	let originPrefix: string;
	let _window: Window;

	function initialize(options: BrowserHistoryOptions) {
		basename = stripTrailingSlash(addLeadingSlash(options.basename || ""));
		originPrefix = options.keepPage ? getOrigin() : "";
		_window = options.window || window;
	}

	initialize(options);

	return {
		setOptions(options) {
			initialize(options);
		},

		getLength(): number {
			return _window.history.length;
		},

		pushState(newLocation: Location, target: string): void {
			if (options.forceRefresh) {
				_window.location.href = target;
			} else {
				_window.history.pushState(
					{ key: newLocation.key, state: newLocation.state },
					"",
					this.modifyPath(target)
				);
			}
		},

		replaceState(newLocation: Location, target: string): void {
			if (options.forceRefresh) {
				_window.location.replace(target);
			} else {
				_window.history.replaceState(
					{ key: newLocation.key, state: newLocation.state },
					"",
					this.modifyPath(target)
				);
			}
		},

		getLocation(): Location {
			const result = {
				pathname: _window.location.pathname,
				search: _window.location.search || "",
				hash: _window.location.hash || "",
				state: _window.history.state?.state || null,
				key: _window.history.state?.key || "",
			};

			result.pathname = addLeadingSlash(
				stripBasename(result.pathname, basename)
			);
			return result;
		},

		listen(): void {
			_window.onpopstate = () => {
				historyListener(this.getLocation());
			};
		},

		go(steps) {
			_window.history.go(steps);
		},

		modifyPath(path) {
			if (basename && basename !== "/") {
				path = basename + path;
			}
			return originPrefix + addLeadingSlash(path);
		},
	};
}

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
export function createBrowserHistory(options?: BrowserHistoryOptions) {
	return new History(createBrowserAdapter, options);
}
