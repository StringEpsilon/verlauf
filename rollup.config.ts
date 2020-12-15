import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import copy from "rollup-plugin-copy";

function makeEsmConfig(input, output) {
	return {
		input: input,
		output: [
			{
				file: output,
				format: "esm",
				plugins: [terser({ numWorkers: 1 })],
			},
		],
		plugins: [
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
				plugins: [terser({ numWorkers: 1 })],
			},
			{
				file: `dist/umd/${pkg.name}.js`,
				format: "umd",
				plugins: [terser({ numWorkers: 1 })],
				name: "verlauf",
			},
		],
		plugins: [
			typescript({
				clean: true,
			}),
		],
	},
	makeEsmConfig("src/adapters/browserHistory.ts", "dist/createBrowserHistory.js"),
	makeEsmConfig("src/adapters/hashHistory.ts", "dist/createHashHistory.js"),
	makeEsmConfig("src/adapters/memoryHistory.ts", "dist/createMemoryHistory.js"),
	makeEsmConfig("src/index.ts", `dist/esm/${pkg.name}.js`,),
	{
		input: "./src/index.ts",
		output: [{ file: "dist/verlauf.d.ts", format: "es" }],
		plugins: [
			dts(),
			copy({
				targets: [
					{ src: 'package.json', dest: 'dist/' },
					// TODO: Remove this workaround once rollup-plugin-dts exports everything correctly.
					{ src: 'verlauf.d.ts', dest: 'dist/', rename: 'types.d.ts' },
					{ src: 'README.md', dest: 'dist/' },
				]
			})
		],
	},
];

export default config;
