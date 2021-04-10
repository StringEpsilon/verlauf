import { createBrowserAdapter, createBrowserHistory } from "../browserHistory";
import { History } from "../../History";

jest.mock("../../History");
describe("createBrowserHistory()", () => {
	it("creates a history instance with a browser history adapter", () => {
		const options = {};
		const history = createBrowserHistory({});
		expect(History).toBeCalledTimes(1);
		expect(History).toBeCalledWith(createBrowserAdapter, options);
	});
});
