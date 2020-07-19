// TODO: This really could need some optimization. But for now it's at least 100% compatible with the old resolve-pathname package,
// according to the unit tests of that package.

/**
 * Resolve one path relative to another.
 *
 * @param to The path to resolve to.
 * @param from The path to resolve from.
 */
export function resolvePathname(to: string, from: string = ""): string {
	if (!from && !to) {
		return "/";
	}
	if (!to) {
		return from;
	}
	if (!from) {
		return to;
	}
	const toParts = to.split("/");
	let resultParts = from.split("/");
	const fromRelative = from[0] !== "/";
	let stackPosition = resultParts.length - 1;

	if (to[0] !== "/") {
		let push = false;
		let reachedRoot = false;
		for (let i = 0; i < toParts.length; i++) {
			if (toParts[i] === "..") {
				if (stackPosition > 0 && !reachedRoot) {
					resultParts.pop();
					stackPosition--;
					resultParts[stackPosition] = "";
				} else if (fromRelative) { // if "from" is absolute, don't attempt to navigate back from root.
					reachedRoot = true;
					resultParts.unshift("..");
					stackPosition++
				}
			} else if (toParts[i] === ".") {
				resultParts[stackPosition] = "";
			} else {
				if (push) {
					resultParts.push(toParts[i]);
					stackPosition++;
				} else {
					resultParts[stackPosition] = toParts[i];
					push = true;
				}
			}
		}
	} else {
		resultParts = [];
		for (let i = 0; i < toParts.length; i++) {
			if (toParts[i] !== "..") {
				resultParts.push(toParts[i]);
			}
		}
	}
	let result = resultParts.join("/");
	if (!fromRelative && result[0] !== "/") {
		result = "/" + result;
	}
	return result;
}
