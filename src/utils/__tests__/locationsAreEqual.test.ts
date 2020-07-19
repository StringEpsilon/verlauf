import { locationsAreEqual } from "../locationsAreEqual";

describe("locationsAreEqual()", () => {
	it("compares pathname", () => {
		expect(locationsAreEqual(
			{ pathname: "/a", search: "?search", hash: "#hash", key: "123456", state: null},
			{ pathname: "/b", search: "?search", hash: "#hash", key: "123456", state: null},
		)).toBe(false);
	});

	it("compares search", () => {
		expect(locationsAreEqual(
			{ pathname: "/a", search: "?search", hash: "#hash", key: "123456", state: null},
			{ pathname: "/a", search: "?query", hash: "#hash", key: "123456", state: null},
		)).toBe(false);
	});

	it("compares hash", () => {
		expect(locationsAreEqual(
			{ pathname: "/a", search: "?search", hash: "#hash", key: "123456", state: null},
			{ pathname: "/a", search: "?search", hash: "#mash", key: "123456", state: null},
		)).toBe(false);
	});

	it("compares key", () => {
		expect(locationsAreEqual(
			{ pathname: "/a", search: "?search", hash: "#hash", key: "123456", state: null},
			{ pathname: "/a", search: "?search", hash: "#hash", key: "923456", state: null},
		)).toBe(false);
	});
});
