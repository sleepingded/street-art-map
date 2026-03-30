/* ══════════════════════════════════════════════════════════
   АВТОРЫ — РЕДАКТИРУЙ ЗДЕСЬ
   ══════════════════════════════════════════════════════════

   Каждый автор связывается с объектами в data.js по полю name —
   оно должно точно совпадать со строкой в массиве authors объекта.

   Поля:
     name     — имя / псевдоним (должно совпадать с data.js)
     photo    — фото или аватар: "photos/authors/имя.jpg" или URL
                оставь "" если нет фото
     bio      — короткая биография (можно оставить "")
     links    — массив ссылок. Каждая ссылка:
                  { label: "Instagram", url: "https://..." }
                оставь [] если ссылок нет

   ══════════════════════════════════════════════════════════ */

const AUTHORS = {
  "LAZY aka Лентяй": {
    name:  "LAZY aka Лентяй",
    photo: "profiles/lazy_pfp.jpg",
    bio:   "Легенда Раевки.",
    links: [
      { label: "Instagram", url: "https://instagram.com/" },
      { label: "Сайт",      url: "https://example.com/" }
    ]
  },
  "Noy": {
    name:  "Noy",
    photo: "profiles/noy_pfp.jpg",
    bio:   "",
    links: [
      { label: "Instagram", url: "https://instagram.com/" }
    ]
  },
  "Graff": {
    name:  "Graff",
    photo: "",
    bio:   "",
    links: []
  }
};
