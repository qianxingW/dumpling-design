export default {
  // esm: 'babel',
  // cjs: 'babel',
  esm: 'rollup',
  cjs: 'rollup',
  // umd: 'rollup',
  // extractCSS: true,
  // disableTypeCheck: true,
  // lessInBabelMode: true,
  // extraPostCSSPlugins: [],
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'dumpling-design',
        libraryDirectory: 'lib',
        style: true,
      },
    ],
  ],
  autoprefixer: {
    overrideBrowserslist: ['ie>8', 'Safari >= 6'],
  },
};
