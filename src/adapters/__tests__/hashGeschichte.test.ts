import { createHashAdapter } from "../hashHistory";
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
	});

	describe("listens to onhashchange", () => {
		const _window = {
			onhashchange: jest.fn(),
			location: new URL(
				"http://www.example.com/index.html#/hashlocation"
			),
			history: {},
		};
		const changeListener = jest.fn();
		// @ts-ignore
		let wrapper = createHashAdapter(changeListener, { window: _window });

		wrapper.listen();
		expect(_window.onhashchange).toBeDefined();
		_window.onhashchange();

		expect(changeListener).toBeCalledTimes(1);
		expect(changeListener).toBeCalledWith({
			hash: "",
			key: "",
			pathname: "/hashlocation",
			search: "",
			state: null,
		});
	});

	describe(".go", () => {
		it("calls window.history.go()", () => {
			const _window = {
				onhashchange: jest.fn(),
				history: {
					go: jest.fn(),
				},
			};
			// @ts-ignore
			let wrapper = createHashAdapter(jest.fn(), { window: _window });

			wrapper.go(-1);

			expect(_window.history.go).toBeCalledTimes(1);
			expect(_window.history.go).toBeCalledWith(-1);
		});
	});
});
