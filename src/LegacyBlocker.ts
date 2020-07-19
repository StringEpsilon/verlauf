import { Location, getUserConfirmation, TransitionBlocker } from "./types";

/**
 * Implements the blocking behavior of history@4.10.
 *
 * @param getUserConfirmation Function used to get confirmation from the user for a blocked transition.
 */
export function LegacyBlocker(getUserConfirmation: getUserConfirmation): TransitionBlocker {
	var _blocked = false;
	var _blockingHook: Function = null;
	var _blockingMessage = ""

	return {
		unblock() {
			_blocked = false;
			_blockingHook = null;
			_blockingMessage = ""
		},

		/**
		 * Activates the blocker. May override an existing blocker.
		 *
		 * @param prompt
		 * prompt is either a string or a function.
		 *   - If string: Prompt the user on every location transition
		 *   - If function: Call the function before every transition. Result of the callback determines block or confirm.
		 *     - If a string is returned: Prompt the user to manually confirm.
		 *     - If a boolean is returned: `false` blocks the transition. `true` allows the transition.
		 *     -  `undefined` (i.e. no result) allows the transition.
		 */
		block(prompt: string | Function) {
			_blocked = true;
			_blockingHook = typeof prompt === "function" ? prompt : null;
			_blockingMessage = (prompt && typeof prompt === "string") ? prompt : "";
			return () => {
				this.unblock();
			};
		},

		isBlocked(newLocation: Location, action: string): boolean {
			if (!_blocked || !getUserConfirmation) {
				return false;
			}
			let isBlocked = true;
			let needsConfirm = !!_blockingMessage;
			let confirmMessage = _blockingMessage;

			if (_blockingHook) {
				let hookResult = _blockingHook(newLocation, action);
				if (typeof hookResult === "undefined") {
					return false;
				}
				if (typeof hookResult === "string") {
					needsConfirm = true;
					confirmMessage = hookResult;
					_blockingMessage = hookResult;
				}
				else {
					isBlocked = !hookResult;
					needsConfirm = false;
				}
			}
			if (isBlocked && needsConfirm) {
				getUserConfirmation(
					confirmMessage,
					(unblock) => { isBlocked = !unblock; }
				);
			}
			return isBlocked;
		}
	};
}
