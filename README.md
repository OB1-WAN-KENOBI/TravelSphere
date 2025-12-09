# TravelSphere

SPA-лендинг для поиска и вдохновения по турам и направлениям. Все данные загружаются из локальных JSON-файлов, бэкенд не нужен.

## Технологии

- React 19 + TypeScript
- Vite
- React Router v6
- React Query / Zustand
- Material UI v6, SCSS
- Framer Motion
- Vitest, ESLint, Prettier

## Архитектура

Feature-Sliced Design:

```
src/
├── app/        # инициализация, провайдеры, роутинг
├── pages/      # страницы
├── widgets/    # крупные блоки
├── features/   # пользовательские сценарии
├── entities/   # бизнес-сущности
└── shared/     # переиспользуемое
    ├── api/    # загрузка данных из public/data
    ├── ui/     # базовые UI-компоненты
    ├── lib/    # утилиты
    ├── constants/ # константы и i18n
    └── types/  # типы
tests/          # модульные тесты (root)
public/data/    # mock-данные: tours, destinations, reviews, partners
```

## Быстрый старт

Требования: Node.js 18+

```bash
npm install
npm run dev   # http://localhost:3000
```

## Сборка и проверка

- `npm run build` — production-сборка (`dist/`)
- `npm run preview` — предпросмотр сборки
- `npm run lint` — ESLint
- `npm run format` — Prettier для `src/**/*`
- `npm run typecheck` — проверка типов
- `npm run test` / `test:ui` / `test:coverage` — Vitest

## Данные

Все данные лежат в `public/data/*.json` и отдаются статикой. Для правок UI/текстов достаточно изменить эти файлы, пересборка не требуется.

