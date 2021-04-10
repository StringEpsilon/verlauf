import { createHashAdapter, createHashHistory } from "../hashHistory";
import { parsePath } from "../../utils/parsePath";

describe("createHashAdapter()", () => {
	describe("modifies path with correct hash type", () => {
		it("on modifyPath - default", () => {
			let wrapper = createHashAdapter(jest.fn(), {});

			expect(wrapper.modifyPath("/foo")).toBe("#/foo");
		});

		it("on modifyPath - noslash", () => {
			let wrapper = createHashAdapter(jest.fn(), { hashType: "noslash" });

			expect(wrapper.modifyPath("/foo")).toBe("#foo");
		});

		it("on modifyPath - noslash - at /", () => {
			let wrapper = createHashAdapter(jest.fn(), { hashType: "noslash" });

			expect(wrapper.modifyPath("/")).toBe("#");
		});

		it("on modifyPath - hashbang", () => {
			let wrapper = createHashAdapter(jest.fn(), {
				hashType: "hashbang",
			});

			expect(wrapper.modifyPath("/foo")).toBe("#!/foo");
		});

		it("on modifyPath - with a basename", () => {
			let wrapper = createHashAdapter(jest.fn(), {
				hashType: "hashbang",
				basename: "/base/name/",
			});

			expect(wrapper.modifyPath("/foo")).toBe("#!/base/name/foo");
		});

		describe("in pushState()", () => {
			it("default", () => {
				let wrapper = createHashAdapter(jest.fn(), {});
				window.history.pushState = jest.fn();
				wrapper.pushState(parsePath("/foo"), "/foo");

				expect(window.history.pushState).toBeCalledWith(
					expect.anything(),
					"",
					"#/foo"
				);
			});

			it("noslash", () => {
				let wrapper = createHashAdapter(jest.fn(), {
					hashType: "noslash",
				});
				window.history.pushState = jest.fn();
				wrapper.pushState(parsePath("/foo"), "/foo");

				expect(window.history.pushState).toBeCalledWith(
					expect.anything(),
					"",
					"#foo"
				);

				wrapper.pushState(parsePath("/"), "/");
				expect(window.history.pushState).toBeCalledWith(
					expect.anything(),
					"",
					"#"
				);
			});

			it("hashbang", () => {
				let wrapper = createHashAdapter(jest.fn(), {
					hashType: "hashbang",
				});
				window.history.pushState = jest.fn();
				wrapper.pushState(parsePath("/foo"), "/foo");

				expect(window.history.pushState).toBeCalledWith(
					expect.anything(),
					"",
					"#!/foo"
				);
			});
		});

		describe("in replaceState()", () => {
			it("default", () => {
				let wrapper = createHashAdapter(jest.fn(), {});
				window.history.replaceState = jest.fn();
				wrapper.replaceState(parsePath("/foo"), "/foo");

				expect(window.history.replaceState).toBeCalledWith(
					expect.anything(),
					"",
					"#/foo"
				);
			});

			it("noslash", () => {
				let wrapper = createHashAdapter(jest.fn(), {
					hashType: "noslash",
				});
				window.history.replaceState = jest.fn();
				wrapper.replaceState(parsePath("/foo"), "/foo");

				expect(window.history.replaceState).toBeCalledWith(
					expect.anything(),
					"",
					"#foo"
				);
			});

			it("hashbang", () => {
				let wrapper = createHashAdapter(jest.fn(), {
					hashType: "hashbang",
				});
				window.history.replaceState = jest.fn();
				wrapper.replaceState(parsePath("/foo"), "/foo");

				expect(window.history.replaceState).toBeCalledWith(
					expect.anything(),
					"",
					"#!/foo"
				);
			});
		});
	});

	describe(".getLength()", () => {
		it("returns non-initial length from window.history", () => {
			// Mock history.length:
			Object.defineProperty(window.history, "length", {
				value: 42,
				configurable: true,
			});

			let wrapper = createHashAdapter(jest.fn(), {});
			expect(wrapper.getLength()).toBe(42);

			// Undo mock:
			Object.defineProperty(
				window.history,
				"length",
				Object.getOwnPropertyDescriptor(
					Object.getPrototypeOf(window.history),
					"length"
				)
			);
		});

		it("returns initial length from window.history", () => {
			let wrapper = createHashAdapter(jest.fn(), {});
			expect(wrapper.getLength()).toBe(1);
		});
	});

	describe(".getLocation()", () => {
		it("extracts location from window.location.hash properly", () => {
			// Mock history.length:
			window.location.hash = "#/current/path";

			let wrapper = createHashAdapter(jest.fn(), {});
			expect(wrapper.getLocation()).toMatchObject({
				pathname: "/current/path",
			});
		});
		it("extracts location from window.location.hash with search and hash", () => {
			// Mock history.length:
			window.location.hash = "#/current/path?search#hash";

			let wrapper = createHashAdapter(jest.fn(), {});
			expect(wrapper.getLocation()).toMatchObject({
				pathname: "/current/path",
				search: "?search",
				hash: "#hash",
			});
		});

		it("extracts location from window.location.hash properly, with hashtype: hashbang", () => {
			// Mock history.length:
			window.location.hash = "#!/current/path";

			let wrapper = createHashAdapter(jest.fn(), {
				hashType: "hashbang",
			});
			expect(wrapper.getLocation()).toMatchObject({
				pathname: "/current/path",
			});
		});

		it("extracts location from window.location.hash properly, with hashtype: noslash", () => {
			// Mock history.length:
			window.location.hash = "#current/path";

			let wrapper = createHashAdapter(jest.fn(), { hashType: "noslash" });
			expect(wrapper.getLocation()).toMatchObject({
				pathname: "/current/path",
			});
		});

		it("strips the basename", () => {
			// Mock history.length:
			window.location.hash = "/prefix/location";

			let wrapper = createHashAdapter(jest.fn(), { basename: "/prefix" });
			expect(wrapper.getLocation()).toMatchObject({
				pathname: "/location",
			});
		});

		it("strips the basename, case insensitively", () => {
			// Mock history.length:
			window.location.hash = "/PREFIX/location";

			let wrapper = createHashAdapter(jest.fn(), { basename: "/prefix" });
			expect(wrapper.getLocation()).toMatchObject({
				pathname: "/location",
			});
		});

		it("in modifyPath(), appends the correct base path", () => {
			let newWindow = Object.create(window);
			delete newWindow.location;
			newWindow.location = {
				...location,
				origin: "https://www.example.com",
				pathname: "/index.html",
			};
			newWindow.document.querySelector = jest.fn(() => true);

			let wrapper = createHashAdapter(jest.fn(), {
				window: newWindow,
				basename: "/base",
				keepPage: true,
			});

			expect(wrapper.modifyPath("/foo")).toBe(
				"https://www.example.com/index.html#/base/foo"
			);
		});
	});

	describe(".listen()", () => {
		it("registers for the onhashchange event of the window", () => {
			const listener = jest.fn();
			let wrapper = createHashAdapter(listener, {});

			expect(window.onhashchange).toBe(null);

			wrapper.listen();

			expect(window.onhashchange).not.toBe(null);

			window.onhashchange(null);

			expect(listener).toBeCalledTimes(1);
		});
	});

	describe(".go()", () => {
		it("passes through to window.history.go", () => {
			let wrapper = createHashAdapter(jest.fn(), {});
			window.history.go = jest.fn();

			wrapper.go(-1);

			expect(window.history.go).toBeCalledTimes(1);
			expect(window.history.go).toBeCalledWith(-1);
		});
	});
});
