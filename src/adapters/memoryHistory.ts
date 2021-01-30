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
	let entries: Location[];

	entries = normalizeEntries(
		options.initialEntries || ["/"],
		options.keyLength
	);
	let activeEntry: number = options.initialIndex ? options.initialIndex : 0;

	return {
		getLength(): number {
			return entries.length;
		},

		modifyPath(path: string): string {
			return path;
		},

		pushState(newLocation: Location, target: string) {
			entries.push(newLocation);
			activeEntry++;
		},

		replaceState(newLocation: Location, target: string) {
			entries[activeEntry] = newLocation;
		},

		getLocation() {
			return entries[activeEntry];
		},

		listen() {
			/* Nothing to listen to. */
		},

		go(steps: number) {
			let targetIndex = activeEntry + steps;
			if (targetIndex >= 0 && targetIndex < entries.length) {
				activeEntry = targetIndex;
				historyListener(entries[targetIndex]);
			}
		},
	};
}

/**
 * Creates a history instance using only internal memory for keeping track of locations.
 * Compatible with node.js environments.
 * @param options Additional options for the memory history.
 */
export function createMemoryHistory(options?: MemoryHistoryOptions) {
	return new History(createMemoryAdapter, options);
}
