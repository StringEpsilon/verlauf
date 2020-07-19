
import { LegacyBlocker } from "../LegacyBlocker";

describe("LegacyBlocker", () => {
	describe(".block()", () => {
		it("prompts user with a string and blocks sucessfully", () => {
			const getUserConfirmation = jest.fn((message, callback) => callback(false));
			const blocker = LegacyBlocker(getUserConfirmation)

			const unblock = blocker.block("Are you sure?");

			expect(
				blocker.isBlocked({pathname: "/foo"}, "PUSH")
			).toBe(true);

			expect(getUserConfirmation).toBeCalledTimes(1);
			expect(getUserConfirmation).toBeCalledWith("Are you sure?", expect.anything());

			unblock();
		});

		it("prompts user with a string and does not block", () => {
			const getUserConfirmation = jest.fn((message, callback) => callback(true));
			const blocker = LegacyBlocker(getUserConfirmation)

			const unblock = blocker.block("Are you sure?");

			expect(
				blocker.isBlocked({pathname: "/foo"}, "PUSH")
			).toBe(false);

			expect(getUserConfirmation).toBeCalledTimes(1);
			expect(getUserConfirmation).toBeCalledWith("Are you sure?", expect.anything());

			unblock();
		});

		it("prompts user if the callback returns a string", () => {
			const getUserConfirmation = jest.fn();
			const callback = jest.fn(() => "Are you sure?");
			const blocker = LegacyBlocker(getUserConfirmation)

			const unblock = blocker.block(callback);

			blocker.isBlocked({pathname: "/foo"}, "PUSH")

			expect(callback).toBeCalledTimes(1);
			expect(callback).toBeCalledWith({pathname: "/foo"}, "PUSH");

			expect(getUserConfirmation).toBeCalledTimes(1);
			expect(getUserConfirmation).toBeCalledWith("Are you sure?", expect.anything());
			unblock();
		});

		it("does not block if callback returns undefined", () => {
			const getUserConfirmation = jest.fn();
			const callback = jest.fn();
			const blocker = LegacyBlocker(getUserConfirmation)

			const unblock = blocker.block(callback);

			expect(
				blocker.isBlocked({pathname: "/foo"}, "PUSH")
			).toBe(false);

			expect(callback).toBeCalledTimes(1);
			expect(callback).toBeCalledWith({pathname: "/foo"}, "PUSH");

			expect(getUserConfirmation).toBeCalledTimes(0);

			unblock();
		});

		it("blocks if callback returns false", () => {
			const getUserConfirmation = jest.fn();
			const callback = () => false;
			const blocker = LegacyBlocker(getUserConfirmation)

			const unblock = blocker.block(callback);

			expect(
				blocker.isBlocked({pathname: "/foo"}, "PUSH")
			).toBe(true);

			unblock();
		});
	});

	it("unblock() clears the block correctly.", () => {
		const getUserConfirmation = jest.fn();
		const blocker = LegacyBlocker(getUserConfirmation)

		const unblock = blocker.block("Are you sure?");
		unblock();

		expect(
			blocker.isBlocked({pathname: "/foo"}, "PUSH")
		).toBe(false);

		expect(getUserConfirmation).toBeCalledTimes(0);
	});

	it("does not block by default", () => {
		const getUserConfirmation = jest.fn();
		const blocker = LegacyBlocker(getUserConfirmation)

		expect(
			blocker.isBlocked({pathname: "/foo"}, "PUSH")
		).toBe(false);

		expect(getUserConfirmation).toBeCalledTimes(0);
	});
});
