import { History } from "../History";
import { HistoryAdapter, NavigationListener, HistoryOptions } from "../types";
import { LegacyBlocker } from "../LegacyBlocker";


interface TestWrapper extends HistoryAdapter {
	callback: NavigationListener,
	options: any,
}

describe("History", () => {
	let testWrapper: TestWrapper;

	let createTestWrapper = (callback: NavigationListener, options: HistoryOptions): HistoryAdapter => {
		let testWrapperInstance = {
			callback,
			options: options,
			listen: jest.fn(),
			getLocation: jest.fn(() => ({
				pathname: "/mock/path",
				hash: "",
				search: "",
				state: null,
				key: "",
			})),
			pushState: jest.fn(() => true),
			replaceState: jest.fn(() => true),
			go: jest.fn(),
			modifyPath: jest.fn(),
			getLength: jest.fn(),
			setOptions: jest.fn(),
		};
		testWrapper = testWrapperInstance;
		return testWrapperInstance;
	};

	it("is constructed properly", () => {
		// es geht voran!
		let history = new History(createTestWrapper);
		expect(history).toBeTruthy();
		expect(testWrapper.listen).toBeCalledTimes(1);
		expect(testWrapper.getLocation).toBeCalledTimes(1);
		expect(testWrapper.getLength).toBeCalledTimes(1);

		// does not call unrelated functions during initilization:
		expect(testWrapper.pushState).not.toBeCalled();
		expect(testWrapper.replaceState).not.toBeCalled();
		expect(testWrapper.go).not.toBeCalled();
		expect(testWrapper.modifyPath).not.toBeCalled();

		expect(testWrapper.options).toMatchObject({
			basename: "",
			keyLength: 6,
		})
	});

	it("sets option defaults, if necessary", () => {
		// es geht voran!
		const mockWrapper = jest.fn(createTestWrapper);
		new History(mockWrapper);

		expect(mockWrapper).toBeCalledWith(
			expect.anything(),
			{
				basename: "",
				keyLength: 6,
				getUserConfirmation: expect.anything(),
				createBlocker: expect.anything(),
			}
		)
	});

	it("uses provided options in full.", () => {
		// es geht voran!
		const mockWrapper = jest.fn(createTestWrapper);
		const options = {
			basename: "/ui/",
			keyLength: 8,
			getUserConfirmation: () => true,
			createBlocker: () => { },
		}
		new History(mockWrapper, options);

		expect(mockWrapper).toBeCalledWith(
			expect.anything(),
			{
				basename: options.basename,
				keyLength: options.keyLength,
				getUserConfirmation: options.getUserConfirmation,
				createBlocker: options.createBlocker,
			}
		)
	});

	it("uses getLocation for the initial location", () => {
		let history = new History(createTestWrapper);
		expect(history.location).toEqual({
			pathname: "/mock/path",
			hash: "",
			search: "",
			state: null,
			key: "",
		});
	});

	it("listens and unlistens properly", () => {
		let history = new History(createTestWrapper);

		let listener = () => { };
		history.listen(listener);

		expect(() => {
			history.unlisten(listener);
			history.unlisten(listener);
		}).not.toThrow();
	});

	it("calls wrapper.pushState on history.push() and updates location", () => {
		let history = new History(createTestWrapper);
		history.push("/foo");

		expect(testWrapper.pushState).toBeCalledTimes(1);
		expect(testWrapper.pushState).toBeCalledWith(
			{
				"hash": "",
				"pathname": "/foo",
				"search": "",
				"state": null,
				key: expect.anything(),
			},
			"/foo",
		);
		expect(history.location.pathname).toBe("/foo");
	});

	describe("block()", () => {
		it("returns and unblock functions that works.", () => {
			let history = new History(createTestWrapper);

			let unblock = history.block("hello!");

			expect(typeof unblock).toBe("function");
			expect(() => unblock()).not.toThrow();

			expect(() => unblock()).not.toThrow();
		});
	});

	it("updates location if wrapper.listen() callback is invoked", () => {
		let history = new History(createTestWrapper);

		expect(history.location.pathname).toBe("/mock/path");
		testWrapper.callback(
			{
				pathname: "/foo",
				hash: "",
				search: "",
			},
			"PUSH",
		);

		expect(history.location).toMatchObject({
			pathname: "/foo",
			hash: "",
			search: "",
		});
	});

	it("calls wrapper.modifyPath on history.createPath() with a constructed path string", () => {
		let history = new History(createTestWrapper);
		let location = { pathname: "/pathname/to/transmogrify", hash: "", search: "" };
		history.createHref(location);

		expect(testWrapper.modifyPath).toBeCalledTimes(1);
		expect(testWrapper.modifyPath).toBeCalledWith("/pathname/to/transmogrify");
	});

	it("does not resolve the location on .createHref()", () => {
		let history = new History(createTestWrapper);
		let location = { pathname: "transmogrify", hash: "", search: "" };
		history.createHref(location);

		expect(testWrapper.modifyPath).toBeCalledTimes(1);
		expect(testWrapper.modifyPath).toBeCalledWith("transmogrify");
	});

	it("calls adapter.setOptions after history.setOption", () => {
		let history = new History(createTestWrapper);
		history.setOption("basename", "/ui/");

		expect(testWrapper.setOptions).toBeCalledTimes(1);
		expect(testWrapper.setOptions).toBeCalledWith({
			keyLength: 6,
			basename: "/ui/",
			createBlocker: LegacyBlocker,
			getUserConfirmation: expect.anything(),
		});
	});
});
