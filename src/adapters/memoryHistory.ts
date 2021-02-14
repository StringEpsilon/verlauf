import { History } from "../History";
import {
	HistoryAdapter,
	Location,
	OnAdapterLocationChange,
	MemoryHistoryOptions,
} from "../types";
import { parsePath } from "../utils/parsePath";
import { createKey } from "../utils/createKey";

/** @ignore */
function normalizeEntries(
	entries: (string | Location)[],
	keyLength?: number
): Location[] {
	return entries.map((entry: string | Location) => {
		if (typeof entry === "string") {
			let result = parsePath(entry);
			result.key = createKey(keyLength);
			result.state = null;
			return result;
		}
		return entry;
	});
}

/**
 * Creates an adapter with an internal history stack for the History instance.
 * @param historyListener Callback for history "events", invoked on `go()`, as the memory adapter doesn't listen to any browser events.
 * @param options Memory History options.
 */
export function createMemoryAdapter(
	historyListener: OnAdapterLocationChange,
	options: MemoryHistoryOptions
): HistoryAdapter {
	let _entries: Location[];

	_entries = normalizeEntries(
		options.initialEntries || ["/"],
		options.keyLength
	);
	let _currentEntry: number = options.initialIndex ? options.initialIndex : 0;

	return {
		getLength(): number {
			return _entries.length;
		},

		modifyPath(path: string): string {
			return path;
		},

		pushState(newLocation: Location, target: string) {
			_entries.push(newLocation);
			_currentEntry++;
		},

		replaceState(newLocation: Location, target: string) {
			_entries[_currentEntry] = newLocation;
		},

		getLocation(): Location {
			return _entries[_currentEntry];
		},

		listen() {
			/* Nothing to listen to. */
		},

		go(steps: number) {
			let targetIndex = _currentEntry + steps;
			if (targetIndex >= 0 && targetIndex < _entries.length) {
				_currentEntry = targetIndex;
				historyListener(_entries[_currentEntry]);
			}
		},
	};
}

/**
 * Creates a history instance using only internal memory for keeping track of locations.
 * Compatible with node.js environments.
 * @param options Additional options for the memory history.
 */
export function createMemoryHistory(options?: MemoryHistoryOptions): History {
	return new History(createMemoryAdapter, options);
}
