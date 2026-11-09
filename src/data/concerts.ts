/**
 * Афиша концертов — единый источник данных.
 *
 * Данные подгружаются при сборке из опубликованной Google-таблицы
 * (Сергей правит таблицу, Action пересобирает сайт по расписанию).
 *
 * Как это работает:
 * - Переменная окружения CONCERTS_SHEET_URL (секрет/переменная в GitHub
 *   репозитории и в .env локально) содержит URL экспорта таблицы в CSV:
 *   https://docs.google.com/spreadsheets/d/<ID>/export?format=csv
 * - Таблица публикуется: Файл → Поделиться → «Все, у кого есть ссылка»
 *   (просмотр). Колонки: дата | город | площадка | что | билеты (URL).
 *   Дата в формате ДД.ММ.ГГГГ; строки с пустой датой игнорируются;
 *   строки с датой в прошлом не показываются.
 * - Если таблица недоступна или пуста — страница показывает заглушку
 *   «здесь появится афиша» (константа FALLBACK ниже).
 *
 * Локально без .env сайт собирается с заглушкой — сборка не ломается.
 */

export interface Concert {
  /** ДД.ММ.ГГГГ — как ввёл Сергей, выводим как есть */
  dateText: string;
  /** Объект Date для сортировки/фильтра */
  date: Date;
  city: string;
  venue: string;
  what: string;
  /** URL билетов/ивента — пустая строка, если ссылки нет */
  ticketsUrl: string;
}

/** Массив concerts, отсортированный по дате (ближние впереди) */
export async function getConcerts(): Promise<Concert[]> {
  const url = import.meta.env.CONCERTS_SHEET_URL;
  if (!url) return [];

  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const csv = await res.text();
    return parseCsv(csv)
      .map(parseRow)
      .filter((c): c is Concert => c !== null)
      .filter((c) => {
        // показываем концерты, начиная с сегодняшнего дня
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return c.date >= today;
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  } catch {
    return [];
  }
}

// ── разбор CSV (простая реализация: кавычки-обёртки и запятые в кавычках) ──

function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const ch = csv[i];
    if (inQuotes) {
      if (ch === '"') {
        if (csv[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field); field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && csv[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some((f) => f.trim() !== '')) rows.push(row);
      row = [];
    } else {
      field += ch;
    }
  }
  row.push(field);
  if (row.some((f) => f.trim() !== '')) rows.push(row);
  return rows;
}

/** Первая строка CSV — заголовки (дата | город | площадка | что | билеты) */
function parseRow(cells: string[], index: number): Concert | null {
  if (index === 0) return null; // заголовок
  const [dateText = '', city = '', venue = '', what = '', ticketsUrl = ''] =
    cells.map((c) => c.trim());

  const date = parseRuDate(dateText);
  if (!date) return null; // пустые/нечитаемые строки пропускаем

  return { dateText, date, city, venue, what, ticketsUrl };
}

/** ДД.ММ.ГГГГ (и ДД.ММ.ГГ → 20ГГ) → Date; иначе null */
function parseRuDate(s: string): Date | null {
  const m = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2}|\d{4})$/);
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]) - 1;
  let year = Number(m[3]);
  if (year < 100) year += 2000;
  const d = new Date(year, month, day);
  return Number.isNaN(d.getTime()) ? null : d;
}
