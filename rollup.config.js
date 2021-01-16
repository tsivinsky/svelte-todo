import resolve from "rollup-plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "rollup-plugin-babel";
import svelte from "rollup-plugin-svelte";
import autoPreprocess from "svelte-preprocess";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import scss from "rollup-plugin-scss";
import livereload from "rollup-plugin-livereload";

const config = {
  input: "src/app.js",
  output: {
    file: "public/bundle.min.js",
    format: "iife",
  },
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    babel({
      include: ["src/**/*.js"],
    }),
    svelte({
      include: "src/components/**/*.svelte",
      preprocess: autoPreprocess({
        scss: {
          implementation: require("sass"),
        },
      }),
    }),
    terser(),
    scss({
      output: "public/style.css",
    }),
  ],
};

export default (args) => {
  if (args.serve === true) {
    config.plugins.push(
      serve({ contentBase: "public", port: 3000 }),
      livereload({ watch: "public" })
    );
  }

  return config;
};
