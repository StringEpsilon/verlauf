import { Location } from "../types";

/**
 * Parse a string path to get a location object.
 * @param path the string to parse.
 * @returns parsed location object. Defaults to {pathname: "/": search: "", hash: ""} for invalid strings.
 */
export function parsePath(path: string): Location {
	const PATH_REGEX = /([^#?]*)?(\?[^#]*)?(#.*)?/g;
	let matches = PATH_REGEX.exec(path || "/");

	// Can't really test this without typescript complaining.
	/* istanbul ignore next */
	if (!matches) {
		return {
			pathname: "",
			search: "",
			hash: "",
		};
	}
	return {
		pathname: matches[1] || "",
		search: matches[2] && matches[2] !== "?" ? matches[2] : "",
		hash: matches[3] && matches[3] !== "#" ? matches[3] : "",
	};
}
