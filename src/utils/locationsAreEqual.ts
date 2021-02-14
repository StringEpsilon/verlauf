import { Location } from "../types";

/**
 * Check if two locations are equal.
 * @param a first location
 * @param b second location
 * @returns true, if the locations are equal.
 */
export function locationsAreEqual(a: Location, b: Location): boolean {
	return (
		a === b ||
		(a.pathname === b.pathname &&
			a.search === b.search &&
			a.hash === b.hash &&
			a.key === b.key &&
			a.state === b.state)
	);
}
