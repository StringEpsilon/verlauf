import { resolvePathname } from "../resolvePathname";

describe("resolvePathname", () => {
	const testCases = [
		{ to: "", from: "", result: "/" },
		{ to: "", from: "/foo", result: "/foo" },
		{ to: ".", from: "/bar/baz", result: "/bar/" },
		// Absolute "to":
		{ to: "/foo", from: "", result: "/foo" },
		{ to: "/foo", from: "/bar", result: "/foo" },
		{ to: "/foo", from: "/bar/baz", result: "/foo" },
		// Relative shenanigangs:
		{ to: "./foo", from: "/bar/baz", result: "/bar/foo" },
		{ to: "..", from: "/bar/baz", result: "/" },
		{ to: "..", from: "/bar/baz/", result: "/bar/" },
		{ to: "../../..", from: "/bar/baz", result: "/" },

		{ to: "../a", from: "/bar/baz", result: "/a" },
		{ to: "../a", from: "/bar/baz/", result: "/bar/a" },
		{ to: "../../../a", from: "/bar/baz", result: "/a" },

		// Weird "to":
		{ to: "/../../../../../a", from: "/bar/baz", result: "/a" },

		// Add "to" to "from":
		{ to: "./4/5/6", from: "/1/2/3/", result: "/1/2/3/4/5/6" },
		{ to: "3/4", from: "/1/2/3", result: "/1/2/3/4" },
		{ to: "../5/../1", from: "/1/2/3/4/", result: "/1/2/3/1" },
		{ to: "../5/../..", from: "/1/2/3/4/", result: "/1/2/" },
	];

	testCases.forEach((x) => {
		it(`(from: ${x.from}, to: ${x.to}) returns ${x.result}`, () => {
			expect(resolvePathname(x.to, x.from)).toBe(x.result);
		});
	});
});
