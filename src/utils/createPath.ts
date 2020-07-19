import { Location } from "../types";

/**
 * Creates a path string from a location object.
 *
 * @param location Location object to create a path from.
 * @returns the path string.
 */
export function createPath(location: Location): string {
	if (!location) {
		return "/";
	}
	let path = location.pathname || "/";
	if (location.search) {
		path += location.search.replace(/^\??/, "?");
	}
	if (location.hash) {
		path += location.hash.replace(/^\#?/, "#");
	}
	return path;
}
