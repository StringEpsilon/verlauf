import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";

const config = [
	{
		input: "src/index.ts",
		output: [
			{ file: `dist/cjs/${pkg.name}.js`, format: "cjs" },
			{ file: `dist/cjs/${pkg.name}.min.js`, format: "cjs", plugins: [terser({ numWorkers: 1 })] },
			{ file: `dist/esm/${pkg.name}.js`, format: "esm" },
			{ file: `dist/esm/${pkg.name}.min.js`, format: "esm", plugins: [terser({ numWorkers: 1 })] },
			{ file: `dist/umd/${pkg.name}.js`, format: "umd", name: "verlauf" },
			{ file: `dist/umd/${pkg.name}.min.js`, format: "umd", plugins: [terser({ numWorkers: 1 })], name: "verlauf" },
		],
		external: ["resolve-pathname"],
		plugins: [
			typescript({
				clean: true,
				tsconfigOverride: { compilerOptions: { removeComments: true } }
			}),
		]
	},
	{
		input: "./src/index.ts",
		output: [{ file: "dist/verlauf.d.ts", format: "es" }],
		plugins: [dts()],
	},
];
export default config;
