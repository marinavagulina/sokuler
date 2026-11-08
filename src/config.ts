/**
 * Конфиг сайта. Меняется в одном месте — применяется на всех страницах.
 * ПЛЕЙСХОЛДЕРЫ (email, соцсети) — уточнить у Сергея перед публикацией.
 */
export const SITE = {
  name: 'Сергей Сокулер',
  role: 'бас-гитара · контрабас · педагог',
  /** ПЛЕЙСХОЛДЕР — реальный адрес уточнить у Сергея */
  email: 'info@sokuler.ru',
  socials: {
    vk: {
      url: 'https://vk.com/sokuler', // ПЛЕЙСХОЛДЕР
      display: 'Басист Сергей Сокулер',
    },
    youtube: {
      url: 'https://youtube.com/@sokuler', // ПЛЕЙСХОЛДЕР
      display: 'Басист Сергей Сокулер',
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
