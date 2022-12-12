import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import cleanup from 'rollup-plugin-cleanup';
import { terser } from "rollup-plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";
import filesize from 'rollup-plugin-filesize';
import serve from 'rollup-plugin-serve';
import replace from '@rollup/plugin-replace';

const { version } = JSON.parse(readFileSync('package.json', 'utf8'))

const isDev = process.env.NODE_ENV == 'development';

export default {
  input: "src/index.js",
  external: ['jquery', 'mobx'],
  plugins: [
    cleanup(),
    replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        "process.env.BUILD_DATE": () => JSON.stringify(new Date()),
        "process.env.BUILD_VERSION": version
    }),
    filesize(),
    visualizer(),
    isDev && serve({
      contentBase: ['dist', 'public'],
    }),
  ],
  output: [
    {
      file: "dist/knockout.umd.js",
      format: "umd",
      name: "ko",
      sourcemap: true,
      globals: {
        jquery: '$',
        mobx: 'mobx'
      },
    },
    {
      file: "dist/knockout.umd.min.js",
      format: "umd",
      name: "ko",
      plugins: [terser()],
      sourcemap: true,
      globals: {
        jquery: '$',
        mobx: 'mobx'
      },
    },
  ],
};
