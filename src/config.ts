/**
 * Конфиг сайта. Меняется в одном месте — применяется на всех страницах.
 * ПЛЕЙСХОЛДЕРЫ (email, соцсети) — уточнить у Сергея перед публикацией.
 * Домен sokuler.ru подтверждён Мариной 09.11.2026.
 * Используется для canonical/og:url (Base.astro), JSON-LD; должен совпадать
 * с site в astro.config.mjs и ссылкой Sitemap в public/robots.txt.
 */
export const SITE = {
  name: 'Сергей Сокулер',
  role: 'бас-гитара · контрабас · педагог',
  url: 'https://sokuler.ru',
  /** ПЛЕЙСХОЛДЕР → подтверждён Сергеем 10.11.2026: subwoofer2@yandex.ru */
  email: 'subwoofer2@yandex.ru',
  socials: {
    vk: {
      url: 'https://vk.ru/id180725233',
      display: 'Басист Сергей Сокулер',
    },
    youtube: {
      url: 'https://youtube.com/@sokuler', // ПЛЕЙСХОЛДЕР — канал будет наполняться
      display: 'Басист Сергей Сокулер',
    },
    telegram: {
      url: 'https://t.me/soo_cooler82', // подтверждён Сергеем 10.11.2026
      display: '@soo_cooler82',
    },
  },
} as const;

/** Меню шапки — единое для всех страниц (и для мобильной панели) */
export const MENU = [
  { label: 'Главная', href: '/' },
  { label: 'О себе', href: '/o-sebe/' },
  { label: 'Ученикам', href: '/obuchenie/' },
  { label: 'Концерты', href: '/koncerty/' },
  { label: 'Контакты', href: '/kontakty/' },
] as const;
