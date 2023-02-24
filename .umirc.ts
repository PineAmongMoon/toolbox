import { defineConfig } from 'umi';

export default defineConfig({
  npmClient: 'yarn',
  base: '/toolbox',
  publicPath: '/toolbox/',
  exportStatic: {},
  links: [{ rel: 'apple-touch-icon', href: '/toolbox/favicon.png' }],
});
