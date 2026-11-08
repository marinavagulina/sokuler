// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  // Сайт-архив: полностью статический, без SSR
  output: 'static',
  integrations: [vue()],
});
