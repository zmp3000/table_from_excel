# Тестовое задание

## Быстрое начало:

```bash
# установка зависимостей из запуск веб-приложения 
npm i && npm run dev
```

## Сборка:

```bash
# установка зависимостей из запуск веб-приложения 
npm run build
```

### Архитектура проекта сделана по Feature-Sliced Design (FSD)
```txt
├── app - основное приложение
│   ├── App.css
│   ├── Table.tsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   ├── index.tsx
│   └── vite-env.d.ts
├── features - функции по тз для основного приложения
│   └── GenerateTableFunctions.ts
├── shared - прочие компоненты UI и другие
│   └── components
│       └── Modal.tsx
└── widgets - виджеты основного приложения
    ├── HeaderButtons.tsx
    ├── TableContent.tsx
    └── TableRow.tsx
```