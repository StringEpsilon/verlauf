import * as index from "../index";

describe("index", () => {
	it("exports all public functions and classes", () => {

		expect(index.History).toBeDefined();
		expect(index.createPath).toBeDefined();
		expect(index.createLocation).toBeDefined();
		expect(index.locationsAreEqual).toBeDefined();
		expect(index.createHashAdapter).toBeDefined();
		expect(index.createHashHistory).toBeDefined();
		expect(index.createBrowserAdapter).toBeDefined();
		expect(index.createBrowserHistory).toBeDefined();
		expect(index.createMemoryAdapter).toBeDefined();
		expect(index.createMemoryHistory).toBeDefined();
	})
});
