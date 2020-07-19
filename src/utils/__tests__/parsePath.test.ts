import { parsePath } from "../parsePath";

describe("parsePath()", () => {
	it("Returns default location on empty string", () => {
		expect(parsePath("")).toEqual(
			{ pathname: "/", search: "", hash: "" }
		);
	});

	it("Returns silly locations too:", () => {
		// Compatibility ftw.
		expect(parsePath("Hello World!")).toEqual(
			{ pathname: "Hello World!", search: "", hash: "" }
		);
	});

	it("Returns empty search, if it's just '?'", () => {
		expect(parsePath("?").search).toEqual("");
	});

	it("Returns empty hash, if it's just '#'", () => {
		expect(parsePath("#").hash).toEqual("");
	});

	it("Returns a full location", () => {
		expect(parsePath("/path?search#hash")).toEqual(
			{ pathname: "/path", search: "?search", hash: "#hash" }
		);
	});

	it("Returns a hash containing ?", () => {
		expect(parsePath("/path#hash?search")).toEqual(
			{ pathname: "/path", search: "", hash: "#hash?search" }
		);
	});
});
