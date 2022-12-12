import cleanup from 'rollup-plugin-cleanup';
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  plugins: [
    cleanup(),
  ],
  output: [
    {
      file: "dist/knockout.umd.js",
      format: "umd",
      name: "ko",
      sourcemap: true,
    },
    {
      file: "dist/knockout.umd.min.js",
      format: "umd",
      name: "ko",
      plugins: [terser()],
      sourcemap: true,
    },
  ],
};
