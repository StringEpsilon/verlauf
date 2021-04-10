import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import copy from "rollup-plugin-copy";

function makeEsmConfig(input, output) {
	return {
		input: input,
		output: { file: "dist/" + output, format: "esm" },
		plugins: [
			[terser({ numWorkers: 1 })],
			typescript({
				clean: true,
				tsconfigOverride: {
					compilerOptions: { target: "ES6", module: "ESNext" },
				},
			}),
		],
	};
}

const config = [
	{
		input: "src/index.ts",
		output: [
			{
				file: `dist/cjs/${pkg.name}.js`,
				format: "cjs",
			},
			{
				file: `dist/umd/${pkg.name}.js`,
				format: "umd",
				name: pkg.name,
			},
		],
		plugins: [typescript({ clean: true }), terser({ numWorkers: 1 })],
	},
	makeEsmConfig("src/adapters/browserHistory.ts", "createBrowserHistory.js"),
	makeEsmConfig("src/adapters/hashHistory.ts", "createHashHistory.js"),
	makeEsmConfig("src/adapters/memoryHistory.ts", "createMemoryHistory.js"),
	makeEsmConfig("src/index.ts", `dist/esm/${pkg.name}.js`),
	{
		input: "./src/index.ts",
		output: [{ file: "dist/verlauf.d.ts", format: "es" }],
		plugins: [
			dts(),
			copy({
				targets: [
					{ src: "package.json", dest: "dist/" },
					{ src: "README.md", dest: "dist/" },
				],
			}),
		],
	},
];

export default config;
