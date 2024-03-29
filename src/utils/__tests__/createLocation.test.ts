import { createLocation } from "../createLocation";
import { parsePath } from "../parsePath";

// These unit tests were taken from the history v4 branch and amended / slightly modified.
// Original copyright: History contributors.

describe("createLocation()", () => {
	describe("with preserveSearch = true", () => {
		it("preserves the search fragment when only the hash changes", () => {
			expect(
				createLocation(
					"#hash",
					null,
					null,
					parsePath("/path?search"),
					true
				)
			).toMatchObject({
				pathname: "/path",
				search: "?search",
				hash: "#hash",
			});
		});

		it("Returns empty string for search if there is no current location.", () => {
			expect(
				createLocation("#hash", null, null, void 0, true)
			).toMatchObject({
				pathname: "/",
				search: "",
				hash: "#hash",
			});
		});

		it("overrides the search, if the new location has it", () => {
			expect(
				createLocation(
					"?newSearch#hash",
					null,
					null,
					parsePath("/path?oldSearch"),
					true
				)
			).toMatchObject({
				pathname: "/path",
				search: "?newSearch",
				hash: "#hash",
			});
		});

		it("clears the search when pathname changes", () => {
			expect(
				createLocation(
					"/",
					null,
					null,
					parsePath("/path?oldSearch"),
					true
				)
			).toMatchObject({
				pathname: "/",
				search: "",
				hash: "",
			});
		});
	});

	describe("with empty to and/or from", () => {
		it("creates a root location pathname", () => {
			expect(createLocation("")).toMatchObject({
				pathname: "/",
				search: "",
				hash: "",
			});
		});
		it("uses to path", () => {
			expect(createLocation("/to")).toMatchObject({
				pathname: "/to",
				search: "",
				hash: "",
			});
		});

		it("uses from path", () => {
			expect(
				createLocation({ pathname: "" }, null, null, {
					pathname: "/from",
				})
			).toMatchObject({
				pathname: "/from",
				search: "",
				hash: "",
			});
		});
	});

	describe("with a full path", () => {
		describe("given as a string", () => {
			it("has the correct properties", () => {
				expect(
					createLocation("/the/path?the=query#the-hash")
				).toMatchObject({
					pathname: "/the/path",
					search: "?the=query",
					hash: "#the-hash",
				});
			});
		});

		describe("given as an object", () => {
			it("has the correct properties", () => {
				expect(
					createLocation({
						pathname: "/the/path",
						search: "?the=query",
						hash: "#the-hash",
					})
				).toMatchObject({
					pathname: "/the/path",
					search: "?the=query",
					hash: "#the-hash",
				});
			});
		});
	});

	describe("with a relative path", () => {
		describe("given as a string", () => {
			it("has the correct properties", () => {
				expect(
					createLocation("the/path?the=query#the-hash")
				).toMatchObject({
					pathname: "the/path",
					search: "?the=query",
					hash: "#the-hash",
				});
			});
		});

		describe("given as an object", () => {
			it("has the correct properties", () => {
				expect(
					createLocation({
						pathname: "the/path",
						search: "?the=query",
						hash: "#the-hash",
					})
				).toMatchObject({
					pathname: "the/path",
					search: "?the=query",
					hash: "#the-hash",
				});
			});
		});
	});

	describe("with a path with no pathname", () => {
		describe("given as a string", () => {
			it("has the correct properties", () => {
				expect(createLocation("?the=query#the-hash")).toMatchObject({
					pathname: "/",
					search: "?the=query",
					hash: "#the-hash",
				});
			});
		});
	});

	describe("with a path with no search", () => {
		describe("given as a string", () => {
			it("has the correct properties", () => {
				expect(createLocation("/the/path#the-hash")).toMatchObject({
					pathname: "/the/path",
					search: "",
					hash: "#the-hash",
				});
			});
		});

		describe("given as an object", () => {
			it("has the correct properties", () => {
				expect(
					createLocation({ pathname: "/the/path", hash: "#the-hash" })
				).toMatchObject({
					pathname: "/the/path",
					search: "",
					hash: "#the-hash",
				});
			});
		});
	});

	describe("with a path with no hash", () => {
		describe("given as a string", () => {
			it("has the correct properties", () => {
				expect(createLocation("/the/path?the=query")).toMatchObject({
					pathname: "/the/path",
					search: "?the=query",
					hash: "",
				});
			});
		});

		describe("given as an object", () => {
			it("has the correct properties", () => {
				expect(
					createLocation({
						pathname: "/the/path",
						search: "?the=query",
					})
				).toMatchObject({
					pathname: "/the/path",
					search: "?the=query",
					hash: "",
				});
			});
		});
	});

	describe("key", () => {
		it("has a key property if a key is provided", () => {
			const location = createLocation("/the/path", undefined, "key");
			expect(Object.keys(location)).toContain("key");
		});

		it("has no key property if no key is provided", () => {
			const location = createLocation("/the/path");
			expect(Object.keys(location)).not.toContain("key");
		});
	});
});
