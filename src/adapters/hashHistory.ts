import { History } from "../History";
import {
	HistoryAdapter,
	Location,
	OnAdapterLocationChange,
	HashHistoryOptions,
} from "../types";
import { parsePath } from "../utils/parsePath";
import {
	stripTrailingSlash,
	addLeadingSlash,
	stripBasename,
	stripLeadingSlash,
} from "../basenameUtils";

/** @ignore */
function getHashBase(): string {
	if (!document.querySelector("base[href]")) {
		return "";
	}
	return (
		document.location.origin +
		document.location.pathname +
		document.location.search
	);
}

/**
 * Creates an adapter to interface the HMTL 5 history API with the history instance for hash based history.
 * @param historyListener Callback for history events (onhashchange).
 * @param options Hash history options.
 */
export function createHashAdapter(
	historyListener: OnAdapterLocationChange,
	options: HashHistoryOptions
): HistoryAdapter {
	let basename: string = stripTrailingSlash(
		addLeadingSlash(options.basename || "")
	);
	let _window: Window = options.window || window;
	let hash: string = "#/";
	let hashBase: string = getHashBase();

	if (options.hashType === "noslash") {
		hash = "#";
	}
	if (options.hashType === "hashbang") {
		hash = "#!/";
	}

	return {
		getLength(): number {
			return _window.history.length;
		},

		pushState(newLocation: Location, target: string): void {
			_window.history.pushState(
				{ key: newLocation.key, state: newLocation.state },
				"",
				this.modifyPath(target)
			);
		},

		replaceState(newLocation: Location, target: string): void {
			_window.history.replaceState(
				{ key: newLocation.key, state: newLocation.state },
				"",
				this.modifyPath(target)
			);
		},

		getLocation(): Location {
			let result = parsePath(_window.location.hash.substr(hash.length));
			result.state = _window.history.state?.state || null;
			result.key = _window.history.state?.key || "";
			result.pathname = addLeadingSlash(
				stripBasename(addLeadingSlash(result.pathname), basename)
			);
			return result;
		},

		listen(): void {
			_window.onhashchange = () => {
				historyListener(this.getLocation());
			};
		},

		go(steps): void {
			_window.history.go(steps);
		},

		modifyPath(path) {
			if (basename && basename !== "/") {
				path = basename + path;
			}

			return hashBase + hash + stripLeadingSlash(path);
		},
	};
}

/**
 * Creates a History instance that keeps all location information in the hash portion of the URL.
 * @param options Additional options for the hash histories behavior.
 */
export function createHashHistory(options?: HashHistoryOptions) {
	return new History(createHashAdapter, options);
}
