/*! @License: CC0 1.0, by MDN contributors (escapeRegex)*/
/**@ignore */
function escapeRegex(value: string) {
	return value.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

/** @ignore */
export function stripBasename(path: string, prefix?: string): string {
	if (!prefix || prefix === "/") {
		return path;
	}
	return path.replace(
		new RegExp("^" + escapeRegex(prefix) + "(?=[/?#]|$)","ig"),
		""
	);
}

/** @ignore */
export function addLeadingSlash(path: string) {
	return path.replace(/^(\/)?/, "/");
}

/** @ignore */
export function stripLeadingSlash(path: string) {
	return path.replace(/^\//, "");
}

/** @ignore */
export function stripTrailingSlash(path: string) {
	return path.replace(/\/$/, "");
}
