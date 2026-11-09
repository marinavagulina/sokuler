# Публикация сайта (GitHub Pages)

## Как устроен деплой
- Workflow `.github/workflows/deploy.yml`: при каждом пуше в `main` сайт
  собирается (`npm ci` + `npm run build`) и публикуется на GitHub Pages
  через `actions/deploy-pages`. Ручной запуск — вкладка Actions →
  «Deploy site to GitHub Pages» → Run workflow.
- Публичный адрес после привязки домена: **https://sokuler.ru**
  (до привязки — https://marinavagulina.github.io/sokuler/, стили там
  не подгрузятся: пути рассчитаны на корень домена).
- Файл `public/CNAME` (строка `sokuler.ru`) попадает в сборку и
  привязывает домен на стороне Pages.

## Привязка домена sokuler.ru (сделать один раз)

### 1. GitHub
- Settings → Pages → Custom domain: `sokuler.ru` → Save.
- (Файл CNAME уже в репозитории, поэтому поле можно просто подтвердить.)
- Дождаться проверки DNS и выпуска сертификата; включить Enforce HTTPS.

### 2. DNS у регистратора (nic.ru → Домены → DNS)
Сейчас домен смотрит на парковку хостинга (nginx «Welcome to nginx!»).
Заменить записи:

| Тип  | Имя | Значение |
|------|-----|----------|
| A    | @   | 185.199.108.153 |
| A    | @   | 185.199.109.153 |
| A    | @   | 185.199.110.153 |
| A    | @   | 185.199.111.153 |
| CNAME | www | marinavagulina.github.io |

- Старые A-записи парковки удалить.
- Применение: от 15 минут до 24 часов (обычно быстрее).

### 3. Проверка после смены DNS
- https://sokuler.ru — главная сайта;
- https://sokuler.ru/sitemap-index.xml — карта сайта;
- сертификат (замок) в браузере.

## Проверенные факты (09.11.2026)
- Ветки приведены к одной `main` (локально и на GitHub; `master` удалён).
- Pages включён через API (`build_type=workflow`); первый запуск workflow
  упал (Pages ещё не был включён), повторный — success: build + deploy.
- https://marinavagulina.github.io/sokuler/ отвечает HTTP 200.
- DNS: NS nic.ru; A-записи указывают на парковку (109.70.26.37, 194.85.61.76);
  HTTP 200 (nginx), HTTPS — таймаут.
