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
function getOrigin(window: Window): string {
	if (!window.document.querySelector("base[href]")) {
		return "";
	}
	return stripTrailingSlash(window.location.origin);
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
	let _basename: string = stripTrailingSlash(
		addLeadingSlash(options.basename || "")
	);
	let _window: Window = options.window || window;
	let _originPrefix: string = options.keepPage ? getOrigin(_window) : "";

	return {
		getLength(): number {
			return _window.history.length;
		},

		pushState(newLocation: Location, target: string) {
			if (options.forceRefresh) {
				_window.location.href = target;
				return;
			}
			_window.history.pushState(
				{ key: newLocation.key, state: newLocation.state },
				"",
				this.modifyPath(target)
			);
		},

		replaceState(newLocation: Location, target: string) {
			if (options.forceRefresh) {
				_window.location.replace(target);
				return;
			}
			_window.history.replaceState(
				{ key: newLocation.key, state: newLocation.state },
				"",
				this.modifyPath(target)
			);
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
				stripBasename(result.pathname, _basename)
			);
			return result;
		},

		listen() {
			_window.onpopstate = () => {
				historyListener(this.getLocation());
			};
		},

		go(steps) {
			_window.history.go(steps);
		},

		modifyPath(path): string {
			if (_basename && _basename !== "/") {
				path = _basename + path;
			}
			return _originPrefix + addLeadingSlash(path);
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
export function createBrowserHistory(options?: BrowserHistoryOptions): History {
	return new History(createBrowserAdapter, options);
}
