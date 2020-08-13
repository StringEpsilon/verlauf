// TODO: Make this a little easier to understand and maybe squeeze some optimizations in there.

// Note: I tested this against the unit tests of the 'resolve-pathname' package,
// but since this is a completely different approach implemented from scratch
// it's probably not 100% the same behavior on edge cases.

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
	if (to[0] === "/") {
		return toParts
			.filter((item, i) => {
				return item !== ".." && (i < 1 || toParts[i + 1] !== "..");
			})
			.join("/");
	}

	let resultParts = from.split("/");
	let position = resultParts.length - 1;
	let push = false;
	let i = 0;
	while (toParts[i] === "..") {
		if (position > 0) {
			resultParts.pop();
			position--;
		}
		i++;
	}
	resultParts[position] = "";
	for (; i < toParts.length; i++) {
		if (toParts[i] === "..") {
			if (i === toParts.length - 1) {
				resultParts[position] = "";
			} else {
				resultParts.pop();
				position--;
			}
		} else if (toParts[i] === ".") {
			resultParts[position] = "";
		} else {
			if (push) {
				resultParts.push();
				position++;
			}
			resultParts[position] = toParts[i];
			push = true;
		}
	}
	let result = resultParts.join("/");
	return result[0] !== "/" ? "/" + result : result;
}
