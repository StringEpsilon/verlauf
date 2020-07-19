import { createPath } from "../createPath";

describe("createPath()", () => {
	it("adds ? and # for search and hash", () => {
		expect(createPath({ pathname: "/path", search: "search", hash: "hash" }))
			.toBe("/path?search#hash");
	});

	it("ingores existing ? and # for hash and search.", () => {
		expect(createPath({ pathname: "/path", search: "?search", hash: "#hash" }))
			.toBe("/path?search#hash");
	});

	it("returns default path of '/' on null and undefined input", () => {
		expect(createPath(null)).toBe("/");
		expect(createPath(undefined)).toBe("/");
	});

	it("return / on empty location", () => {
		expect(createPath({ pathname: "", search: "", hash: "" })).toBe("/");
	});

	it("can add only hash or only search", () => {
		expect(createPath({ pathname: "", search: "search", hash: "" })).toBe("/?search");

		expect(createPath({ pathname: "", search: "", hash: "hash" })).toBe("/#hash");
	});
});
