import { createBrowserAdapter } from "../browserHistory";
import { parsePath } from "../../utils/parsePath";

describe("createBrowserAdapter()", () => {
	describe("adds basename to path", () => {
		it("in modifyPath() - without basename", () => {
			let wrapper = createBrowserAdapter(jest.fn(), {});

			expect(wrapper.modifyPath("/foo")).toBe("/foo");
		});

		it("in modifyPath() - with basename", () => {
			let wrapper = createBrowserAdapter(jest.fn(), {
				basename: "/base",
			});

			expect(wrapper.modifyPath("/foo")).toBe("/base/foo");
		});

		it("in modifyPath() - with option.keepPage, no base href.", () => {
			let wrapper = createBrowserAdapter(jest.fn(), {
				basename: "/base",
				keepPage: true,
			});

			expect(wrapper.modifyPath("/foo")).toBe("/base/foo");
		});

		it("in modifyPath() - with option.keepPage, yes base href.", () => {
			let newWindow = Object.create(window);
			delete newWindow.location;
			newWindow.location = {
				...location,
				origin: "https://www.example.com/",
			};
			newWindow.document.querySelector = jest.fn(() => true);

			let wrapper = createBrowserAdapter(jest.fn(), {
				window: newWindow,
				basename: "/base",
				keepPage: true,
			});

			expect(wrapper.modifyPath("/foo")).toBe(
				"https://www.example.com/base/foo"
			);
		});

		it("in replaceState() - with basename", () => {
			let wrapper = createBrowserAdapter(jest.fn(), {
				basename: "/base",
			});
			window.history.replaceState = jest.fn();
			wrapper.replaceState(parsePath("/foo"), "/foo");

			expect(window.history.replaceState).toBeCalledWith(
				expect.anything(),
				"",
				"/base/foo"
			);
		});

		it("in replaceState() - without basename", () => {
			let wrapper = createBrowserAdapter(jest.fn(), { basename: "" });
			window.history.replaceState = jest.fn();
			wrapper.replaceState(parsePath("/foo"), "/foo");

			expect(window.history.replaceState).toBeCalledWith(
				expect.anything(),
				"",
				"/foo"
			);
		});
	});

	describe(".pushState()", () => {
		it("calls history.pushState with correct paraters", () => {
			let wrapper = createBrowserAdapter(jest.fn(), {});
			window.history.pushState = jest.fn();
			wrapper.pushState(parsePath("/foo"), "/foo");

			expect(window.history.pushState).toBeCalledWith(
				expect.anything(),
				"",
				"/foo"
			);
		});

		it("sets document.location.href with forceRefresh option", () => {
			let wrapper = createBrowserAdapter(jest.fn(), {
				forceRefresh: true,
			});
			let location = Object.assign({}, window.location);
			delete global.window.location;
			window = Object.create(window);
			window.location = { ...location, href: "" };
			wrapper.pushState(parsePath("/foo"), "/foo");

			expect(window.location.href).toBe("/foo");
		});
	});

	describe(".go()", () => {
		it("passes through to window.history.go", () => {
			let wrapper = createBrowserAdapter(jest.fn(), {});
			window.history.go = jest.fn();

			wrapper.go(-1);

			expect(window.history.go).toBeCalledTimes(1);
			expect(window.history.go).toBeCalledWith(-1);
		});
	});

	describe(".replaceState()", () => {
		it("calls history.replaceState with correct paraters", () => {
			let wrapper = createBrowserAdapter(jest.fn(), {});
			window.history.replaceState = jest.fn();
			wrapper.replaceState(parsePath("/foo"), "/foo");

			expect(window.history.replaceState).toBeCalledWith(
				expect.anything(),
				"",
				"/foo"
			);
		});

		it("calls document.location.replace with forceRefresh option", () => {
			let wrapper = createBrowserAdapter(jest.fn(), {
				forceRefresh: true,
			});
			let location = Object.assign({}, window.location);
			delete global.window.location;
			window = Object.create(window);
			window.location = { ...location, replace: jest.fn() };
			wrapper.replaceState(parsePath("/foo"), "/foo");

			expect(window.location.replace).toBeCalledWith("/foo");
		});
	});

	describe(".getLength()", () => {
		it("returns non-initial length from window.history", () => {
			// Mock history.length:
			Object.defineProperty(window.history, "length", {
				value: 42,
				configurable: true,
			});

			let wrapper = createBrowserAdapter(jest.fn(), {});
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
			let wrapper = createBrowserAdapter(jest.fn(), {});
			expect(wrapper.getLength()).toBe(1);
		});
	});

	describe(".listen()", () => {
		it("registers for the onpopstate event of the window", () => {
			const listener = jest.fn();
			let wrapper = createBrowserAdapter(listener, {});

			expect(window.onpopstate).toBe(null);

			wrapper.listen();

			expect(window.onpopstate).not.toBe(null);

			window.onpopstate(null);

			expect(listener).toBeCalledTimes(1);
		});
	});
});
