import { resolvePathname } from "./resolvePathname";
import { Location } from "../types";
import { parsePath } from "./parsePath";

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
export function createLocation(
	path: string | Location,
	state?: any,
	key?: any,
	currentLocation?: Location,
	preserveSearch: boolean = false
) {
	let location: Location;
	if (typeof path === "string") {
		location = parsePath(path);
		location.state = state;
	} else {
		location = {
			pathname: path.pathname || "",
			search:
				path.search && path.search !== "?"
					? path.search.replace(/^\??/, "?")
					: "",
			hash:
				path.hash && path.hash !== "#"
					? path.hash.replace(/^#?/, "#")
					: "",
			state:
				state !== undefined && path.state === undefined
					? state
					: path.state,
		};
	}

	if (key) {
		location.key = key;
	}

	if (preserveSearch) {
		if (!location.pathname && !location.search) {
			location.search = currentLocation.search;
		}
	}

	location.pathname = resolvePathname(
		location.pathname,
		currentLocation?.pathname
	);

	return location;
}
