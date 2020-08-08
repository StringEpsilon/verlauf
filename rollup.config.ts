import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";

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
	{
		input: "src/index.ts",
		output: [
			{
				file: `dist/esm/${pkg.name}.js`,
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
	},
	{
		input: "./src/index.ts",
		output: [{ file: "dist/verlauf.d.ts", format: "es" }],
		plugins: [dts()],
	},
];
export default config;
