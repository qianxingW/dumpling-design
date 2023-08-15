import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Dumpling Design',
  logo: '/logo.png',
  favicon: '/logo.png',
  outputPath: 'docs-dist',
  mode: 'site',
  history: {
    type: 'hash',
  },
  base: '/dumpling-design/',
  publicPath: '/dumpling-design/',
});
