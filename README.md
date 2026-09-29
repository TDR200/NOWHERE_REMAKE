<img width="1672" height="941" alt="mainscreen" src="https://github.com/user-attachments/assets/94375558-0cef-4d15-a026-9c0d95a039e6" /># NOWHERE

> **Atmospheric psychological horror game**
> Browser prototype / Vertical Slice

![Status](https://img.shields.io/badge/status-in%20development-orange)
![Engine](https://img.shields.io/badge/Phaser%203-1f1f1f)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Vite](https://img.shields.io/badge/Vite-purple)
![Platform](https://img.shields.io/badge/platform-Web-blue)

---

## 🎮 About

**Nowhere** — атмосферная психологическая хоррор-игра, построенная вокруг исследования пространства, взаимодействия с окружением, скрытности и постепенного раскрытия происходящего.

На текущем этапе проект развивается как **браузерный прототип**, позволяющий быстро проверять игровые механики, структуру уровней и сценарные последовательности.

Основной принцип проекта:

> **Игрок должен не просто получать информацию о происходящем, а самостоятельно замечать детали, исследовать пространство и собирать историю из происходящего вокруг.**

---

# 🚧 Current Status

Проект находится на стадии **прототипирования / разработки вертикального среза**.

На данный момент в проекте реализованы:

* браузерная версия игры;
* главное меню;
* вертикальный срез;
* локация **«Лесная дорога»**;
* локация **«Кафе»**;
* переход между игровыми зонами;
* изометрическая проекция;
* перемещение персонажа;
* базовая система скрытности;
* отдельные игровые системы движения и скрытности;
* система диалогов;
* система игровых флагов;
* карты в отдельных JSON-файлах;
* подготовленная система загрузки ресурсов;
* каталог игровых ресурсов;
* процедурные визуальные заглушки Phaser вместо финальных изображений.

Исходный прототип сохранён в:

```text
nowhere.html
```

---

# 🕹️ Current Vertical Slice

Текущая последовательность вертикального среза:

```text
┌─────────────────┐
│   Лесная дорога │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│      Кафе       │
└─────────────────┘
```

Вертикальный срез используется для проверки базового игрового цикла, архитектуры проекта и взаимодействия между игровыми системами.

---

# 🛠️ Technology

Текущая браузерная версия использует:

| Technology     | Purpose                           |
| -------------- | --------------------------------- |
| **Phaser 3**   | Game framework / rendering        |
| **TypeScript** | Game logic                        |
| **Vite**       | Development server / build system |
| **JSON**       | Level and game data               |
| **HTML / CSS** | Application shell / UI            |

### Why Phaser?

Phaser позволяет быстро создавать и тестировать игровые механики в браузере без необходимости собирать полноценный production build.

Текущая архитектура рассчитана таким образом, чтобы игровые данные и системы были максимально отделены от визуального слоя.

---

# 🏗️ Architecture

Проект разделён на несколько основных уровней:

```text
┌─────────────────────────────┐
│          Game UI            │
├─────────────────────────────┤
│          Game.ts            │
├─────────────────────────────┤
│          Systems            │
│  Movement / Stealth / etc.  │
├─────────────────────────────┤
│        Scene / Renderer     │
│          GridScene          │
├─────────────────────────────┤
│       Data / JSON           │
│ Forest Road / Cafe / Flags  │
└─────────────────────────────┘
```

Основная идея архитектуры — **не смешивать данные игры, игровые системы и визуализацию**.

Это позволяет изменять карту, диалоги или игровые параметры без необходимости переписывать рендеринг.

---

# 📐 Isometric Projection

Игровое пространство использует изометрическую проекцию.

Размер клетки:

```text
64 × 32 px
```

Проекция вынесена в отдельный модуль:

```text
IsoProjection.ts
```

Это позволяет централизованно преобразовывать координаты игровой сетки в экранные координаты.

Упрощённо:

```text
Grid coordinates
       ↓
IsoProjection
       ↓
Screen coordinates
```

---

# 🧍 Character Positioning

Персонажи привязываются к **основанию спрайта**, а не к его геометрическому центру.

Это особенно важно для изометрического окружения, поскольку именно точка соприкосновения персонажа с землёй должна определять его положение относительно объектов.

---

# 🌊 Depth Sorting

Глубина отображения объектов определяется через их экранную координату:

```text
screenY
```

Чем ниже объект находится на экране, тем выше его приоритет при отрисовке.

Упрощённая модель:

```text
screenY ↑
   │
   │    Object A
   │
   │         Object B
   │
   └────────────────→

Object B rendered in front of Object A
```

Это позволяет персонажам и объектам корректно перекрывать друг друга в изометрическом пространстве.

---

# 🗺️ Level Data

Карты хранятся отдельно от кода и рендера.

Текущие карты:

```text
forest-road.json
cafe.json
```

Это позволяет изменять структуру уровня без изменения основного игрового кода.

Примерная схема:

```text
JSON map
   ↓
GridScene
   ↓
IsoProjection
   ↓
Phaser rendering
```

---

# 💬 Dialogues & Game Flags

Диалоги и игровые флаги отделены от рендеринга.

Игровые события могут изменять состояние игры через флаги, которые затем используются другими системами.

Упрощённая схема:

```text
Player interaction
        ↓
      Event
        ↓
   Game Flag
        ↓
Dialogue / Gameplay
```

Такой подход позволит постепенно расширять сюжет без жёсткой привязки сценария к конкретным Phaser-сценам.

---

# 🕵️ Movement & Stealth

Системы движения и скрытности вынесены отдельно от визуального слоя.

Это позволяет независимо развивать:

* перемещение персонажа;
* обнаружение;
* состояние скрытности;
* взаимодействие с окружением;
* будущую систему противников;
* игровые события, связанные со скрытностью.

---

# 🎨 Visuals

На текущем этапе **финальные игровые изображения ещё не интегрированы**.

Для разработки используются процедурно создаваемые заглушки Phaser.

Они позволяют тестировать:

* размеры объектов;
* положение персонажей;
* изометрическую проекцию;
* depth sorting;
* столкновения;
* движение;
* структуру уровней.

Финальные:

* персонажи;
* окружение;
* предметы;
* эффекты;
* UI;
* иллюстрации

будут добавляться по мере развития проекта.

---

# 📦 Assets

Каталог ресурсов уже подготовлен.

Также подготовлен **манифест загрузки ресурсов**, который будет использоваться для централизованного управления игровыми ассетами.

Предполагаемая структура:

```text
assets/
├── characters/
├── environment/
├── objects/
├── ui/
├── effects/
└── audio/
```

Структура может изменяться по мере разработки.

---

# 📁 Project Structure

Основные элементы проекта:

```text
Nowhere/
│
├── nowhere.html              # Original prototype
│
├── src/
│   ├── Game.ts               # Main game entry point
│   ├── IsoProjection.ts      # Isometric projection
│   ├── GridScene.ts          # Grid / level rendering
│   │
│   ├── systems/
│   │   ├── MovementSystem
│   │   └── StealthSystem
│   │
│   └── ...
│
├── data/
│   ├── forest-road.json      # Forest road map
│   └── cafe.json             # Cafe map
│
├── assets/
│   ├── characters/
│   ├── environment/
│   ├── objects/
│   ├── ui/
│   └── audio/
│
├── public/
│
├── package.json
├── tsconfig.json
├── vite.config.*
└── README.md
```

> Фактическая структура директорий может меняться по мере разработки. В README указаны ключевые архитектурные элементы проекта.

---

# ▶️ Running the Project

Для запуска проекта требуется:

* **Node.js**
* **npm**

После установки Node.js выполните в корневой директории проекта:

```bash
npm install
```

Затем:

```bash
npm run dev
```

После запуска Vite выведет локальный адрес, по которому будет доступна игра.

---

# 🧪 Current Checks

На текущем этапе успешно прошли проверки:

* структура редактора;
* JSON-конфигурации;
* размеры игровых карт;
* структура игровых данных;
* подготовленные ресурсы и манифест загрузки.

Не проверено:

* фактический запуск Vite;
* production build;
* браузерное выполнение игры.


# 🗺️ Development Roadmap

## Phase 1 — Prototype

* [x] Preserve original prototype
* [x] Create Vite project
* [x] Add TypeScript
* [x] Add Phaser 3
* [x] Create main menu
* [x] Create isometric projection
* [x] Create grid-based levels
* [x] Create forest road
* [x] Create cafe
* [x] Separate level data into JSON
* [x] Separate dialogues and flags
* [x] Separate movement system
* [x] Separate stealth system
* [x] Prepare asset catalogue
* [x] Prepare loading manifest
* [x] Add procedural visual placeholders
* [ ] Verify local development build

## Phase 2 — Vertical Slice

* [ ] Replace procedural placeholders with final/prototype art
* [ ] Implement complete player interaction
* [ ] Implement final dialogue flow
* [ ] Implement gameplay flags
* [ ] Expand stealth mechanics
* [ ] Add environmental interactions
* [ ] Add sound
* [ ] Add visual effects
* [ ] Implement complete vertical-slice scenario

## Phase 3 — Production

* [ ] Complete game levels
* [ ] Final character assets
* [ ] Final environment assets
* [ ] Full narrative implementation
* [ ] Audio design
* [ ] VFX
* [ ] UI/UX
* [ ] Save system
* [ ] Performance optimization

## Phase 4 — Release

* [ ] Full playthrough
* [ ] Bug fixing
* [ ] Browser compatibility testing
* [ ] Production build
* [ ] Deployment

---

# 📚 Documentation

Подробная документация проекта будет храниться отдельно от исходного кода.

Предполагаемая структура:

```text
docs/
├── GDD.md
├── STORY.md
├── GAMEPLAY.md
├── TECHNICAL.md
├── ART.md
└── AUDIO.md
```

### Game Design Document

GDD содержит:

* концепцию игры;
* сюжет;
* игровой цикл;
* механики;
* структуру уровней;
* персонажей;
* события;
* требования к визуалу и звуку.

---

# 🔄 Development Workflow

Разработка строится итеративно:

```text
Design
  ↓
Prototype
  ↓
Test
  ↓
Iterate
  ↓
Implement
  ↓
Polish
```

На ранних этапах приоритет отдаётся **проверке игрового процесса**, а не финальному качеству графики.

Поэтому процедурные заглушки являются нормальной частью текущего этапа разработки.

---

# 🌲 Design Principles

### Atmosphere over spectacle

Хоррор строится не только на визуальных событиях.

Основные инструменты:

* пространство;
* тишина;
* звук;
* свет;
* неизвестность;
* изменение привычного окружения;
* ожидание.

### Separation of systems

Игровые данные, системы и визуальный слой должны оставаться максимально независимыми.

### Data-driven design

Карты, диалоги, флаги и другие параметры по возможности хранятся отдельно от программного кода.

Это позволяет быстрее изменять игру и тестировать различные сценарии.

---

# 📌 Project Status

```text
████████░░░░░░░░░░░░  Prototype / Vertical Slice
```

**Current focus:**

> Подготовка стабильной браузерной основы и постепенное превращение текущего вертикального среза в полноценный игровой прототип.

---

# 👤 Project

**NOWHERE**

**Genre:** Psychological Horror / Exploration
**Current Platform:** Web
**Engine:** Phaser 3
**Language:** TypeScript
**Build Tool:** Vite
**Status:** In Development
