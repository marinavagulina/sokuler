// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Сайт-архив: полностью статический, без SSR
  output: 'static',
  // ПЛЕЙСХОЛДЕР ДОМЕНА: заменить на реальный при деплое.
  // Должен совпадать с SITE.url в src/config.ts (canonical, og:url) и с robots.txt.
  // Отсюда официальная sitemap-интеграция берёт адрес страниц.
  site: 'https://sokuler.ru',
  integrations: [vue(), sitemap()],
  // GitHub Pages: Action .github/workflows/deploy.yml собирает и публикует при пуше в main.
  trailingSlash: 'ignore',
});
