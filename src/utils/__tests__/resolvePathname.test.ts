import { resolvePathname } from "../resolvePathname";

describe("resolvePathname", () => {
	const testCases = [
		{ to: "", from: "", result: "/" },
		{ to: "", from: "/foo", result: "/foo" },
		{ to: "/foo", from: "", result: "/foo" },
		{ to: "/foo", from: "/bar", result: "/foo" },
		{ to: "/foo", from: "/bar/baz", result: "/foo" },
		{ to: ".", from: "/bar/baz", result: "/bar/" },
		{ to: "./foo", from: "/bar/baz", result: "/bar/foo" },
	]

	testCases.forEach(x => {
		it(`(${x.from}, ${x.to}) returns ${x.result}`, () => {
			expect(resolvePathname(x.to, x.from)).toBe(x.result);
		});
	});
});
