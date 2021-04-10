import { createHashAdapter, createHashHistory } from "../hashHistory";
import { History } from "../../History";
jest.mock("../../History");

describe("createHashHistory()", () => {
	it("creates a history instance with a hashHistoryAdapter", () => {
		const options = {};
		const history = createHashHistory({});
		expect(History).toBeCalledTimes(1);
		expect(History).toBeCalledWith(createHashAdapter, options);
	});
});
