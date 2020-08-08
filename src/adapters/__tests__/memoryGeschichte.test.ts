import { createMemoryHistory } from "../memoryHistory";

describe("createMemoryHistory()", () => {
	it("creates history with default location", () => {
		let history = createMemoryHistory();

		expect(history).not.toBeFalsy();
		expect(history.location).toMatchObject({
			pathname: "/",
			hash: "",
			search: "",
			state: null,
			key: expect.anything(),
		});
	});

	describe(".createHref()", () => {
		it("returns the path unaltered", () => {
			let history = createMemoryHistory();
			expect(history.createHref({ pathname: "/foo/bar" })).toBe(
				"/foo/bar"
			);
		});
	});

	describe("creates history with location from initialEntries", () => {
		it("and no initialIndex", () => {
			let history = createMemoryHistory({
				initialEntries: ["/foo", "/bar"],
			});

			expect(history).not.toBeFalsy();
			expect(history.location).toMatchObject({
				pathname: "/foo",
			});
		});
		it("and set initialIndex", () => {
			let history = createMemoryHistory({
				initialEntries: ["/foo", "/bar"],
				initialIndex: 1,
			});

			expect(history).not.toBeFalsy();
			expect(history.location).toMatchObject({
				pathname: "/bar",
			});
		});
		it("with proper ILocation entries", () => {
			let history = createMemoryHistory({
				initialEntries: [{ pathname: "/foo", search: "", hash: "" }],
			});

			expect(history).not.toBeFalsy();
			expect(history.location).toMatchObject({
				pathname: "/foo",
			});
		});
	});

	describe("goBack()", () => {
		it("goes back to the first entry", () => {
			let history = createMemoryHistory({
				initialEntries: ["/foo", "/bar"],
				initialIndex: 1,
			});

			expect(history.location.pathname).toBe("/bar");

			history.goBack();
		});

		it("stays on the first entry", () => {
			let history = createMemoryHistory({
				initialEntries: ["/foo", "/bar"],
				initialIndex: 0,
			});

			const callback = jest.fn();
			history.listen(callback);

			expect(history.location.pathname).toBe("/foo");

			history.goBack();

			expect(callback).not.toBeCalled;
			expect(history.location.pathname).toBe("/foo");
		});
	});

	describe("push()", () => {
		it("goes forward to the latest entry", () => {
			let history = createMemoryHistory();

			expect(history.location.pathname).toBe("/");
			expect(history.length).toBe(1);

			history.push("/bar");

			expect(history.location.pathname).toBe("/bar");
			expect(history.length).toBe(2);
		});
	});

	describe("listen() / unlisten()", () => {
		it("calls the listen callback on push", () => {
			const history = createMemoryHistory();
			const callback = jest.fn();
			const unlisten = history.listen(callback);

			history.push("/push/it/real/good");

			expect(callback).toBeCalledTimes(1);
			expect(callback).toBeCalledWith(
				{
					pathname: "/push/it/real/good",
					hash: "",
					search: "",
					state: null,
					key: expect.anything(),
				},
				"PUSH"
			);
			expect(typeof unlisten).toBe("function");
			unlisten();

			history.push("/push/it/real/good");
			expect(callback).toBeCalledTimes(1); // still only one call.
		});

		it("calls the listen callback on replace", () => {
			const history = createMemoryHistory();
			const callback = jest.fn();
			const unlisten = history.listen(callback);

			history.replace("/replaced/it/real/good");

			expect(callback).toBeCalledTimes(1);
			expect(callback).toBeCalledWith(
				{
					pathname: "/replaced/it/real/good",
					hash: "",
					search: "",
					state: null,
					key: expect.anything(),
				},
				"REPLACE"
			);
			expect(typeof unlisten).toBe("function");
			unlisten();

			history.push("/push/it/real/good");
			expect(callback).toBeCalledTimes(1); // still only one call.
		});
	});

	describe("replace()", () => {
		it("goes forward to the latest entry", () => {
			let history = createMemoryHistory({
				initialEntries: ["/"],
			});

			expect(history.location.pathname).toBe("/");
			expect(history.length).toBe(1);

			history.replace("/bar");

			expect(history.location.pathname).toBe("/bar");
			expect(history.length).toBe(1);
		});
	});

	describe("goForward()", () => {
		it("goes forward to the latest entry", () => {
			const callback = jest.fn();
			let history = createMemoryHistory({
				initialEntries: ["/foo", "/bar"],
				initialIndex: 0,
			});

			expect(history.location.pathname).toBe("/foo");

			history.listen(callback);
			history.goForward();

			expect(history.location.pathname).toBe("/bar");
			expect(callback).toBeCalledWith(
				{
					pathname: "/bar",
					hash: "",
					search: "",
					state: null,
					key: expect.anything(),
				},
				"POP"
			);
		});

		it("stays on the last entry", () => {
			const callback = jest.fn();
			let history = createMemoryHistory({
				initialEntries: ["/foo", "/bar"],
				initialIndex: 1,
			});

			history.listen(callback);
			expect(history.location.pathname).toBe("/bar");

			history.goForward();

			expect(history.location.pathname).toBe("/bar");
			expect(callback).not.toBeCalled();
		});
	});
});
