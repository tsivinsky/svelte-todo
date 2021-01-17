import resolve from "rollup-plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "rollup-plugin-babel";
import svelte from "rollup-plugin-svelte";
import autoPreprocess from "svelte-preprocess";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import scss from "rollup-plugin-scss";
import livereload from "rollup-plugin-livereload";
import copy from "rollup-plugin-copy";

const DEST_DIR = "build";

const config = {
  input: "src/app.js",
  output: {
    file: `${DEST_DIR}/bundle.min.js`,
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
      output: `${DEST_DIR}/style.css`,
    }),
    copy({
      targets: [
        {
          src: "public/**/*",
          dest: DEST_DIR,
        },
      ],
    }),
  ],
};

export default (args) => {
  if (args.serve === true) {
    config.plugins.push(
      serve({ contentBase: DEST_DIR, port: 3000 }),
      livereload({ watch: DEST_DIR })
    );
  }

  return config;
};
