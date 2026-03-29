/* ══════════════════════════════════════════════════════════
   ДАННЫЕ — РЕДАКТИРУЙ ЗДЕСЬ
   ══════════════════════════════════════════════════════════

   Чтобы добавить новый объект стрит-арта:
   1. Скопируй один блок { ... , }
   2. Вставь его в конец массива (перед последней ])
   3. Измени данные

   Как найти координаты:
   Открой Google Maps → правый клик на нужном месте
   → нажми на координаты → они скопируются в буфер
   Первое число — lat, второе — lng.

   Поле photo:
   Положи фото в папку photos/ рядом с index.html
   и укажи путь: "photos/название_файла.jpg"
   Или вставь прямую ссылку на фото из интернета.
   Оставь "" если фото пока нет.

   ══════════════════════════════════════════════════════════ */

const ART_OBJECTS = [
  {
    lat: 54.068740,
    lng: 54.922630,
    title: "Гагарин",
    authors: [],
    date: "2019-03",
    desc: "",
    photo: "photos/gagarin.jpg"
  },
  {
    lat: 54.068713,
    lng: 54.934768,
    title: "Растаман",
    authors: ["LAZY aka Лентяй"],
    date: "2015-04",
    desc: "",
    photo: "photos/tunnel.jpg"
  },
  {
    lat: 54.068540,
    lng: 54.938609,
    title: "Арбуз",
    authors: ["LAZY aka Лентяй"],
    date: "2020-02",
    desc: "",
    photo: "photos/watermelon.jpg"
  },
  {
    lat: 54.069047, 
    lng: 54.935994,
    title: "Забор",
    authors: ["LAZY aka Лентяй"],
    date: "2021-06",
    desc: "",
    photo: "photos/fence.jpg"
  },
  {
    lat: 54.068271, 
    lng: 54.933794,
    title: "Мясо",
    authors: ["LAZY aka Лентяй"],
    date: "2021-11",
    desc: "",
    photo: "photos/meat.jpg"
  },
  {
    lat: 54.059694, 
    lng: 54.929119,
    title: "Гомер",
    authors: ["LAZY aka Лентяй"],
    date: "2016-07",
    desc: "",
    photo: "photos/homer_1.jpg"
  },
  {
    lat: 54.079424, 
    lng: 54.928458,
    title: "Рыба",
    authors: ["LAZY aka Лентяй"],
    date: "2016-03",
    desc: "",
    photo: "photos/fish.jpg"
  },
  {
    lat: 54.064474, 
    lng: 54.924015,
    title: "Магаз",
    authors: ["LAZY aka Лентяй", "Graff"],
    date: "2015-09",
    desc: "",
    photo: "photos/store.jpg"
  },
  {
    lat: 54.069708, 
    lng: 54.926426,
    title: "Енот",
    authors: ["LAZY aka Лентяй"],
    date: "2015-07",
    desc: "",
    photo: "photos/raccon.jpg"
  },
  {
    title: "Курение убивает",
    authors: ["LAZY aka Лентяй"],
    date: "2022-05",
    destroyed: true,
    desc: "Точное местоположение неизвестно",
    photo: "photos/smoking.jpg"
  },
  {
    lat: 54.069708, 
    lng: 54.926426,
    title: "Выживыший",
    authors: ["LAZY aka Лентяй"],
    date: "2015-07",
    destroyed: true,
    desc: "",
    photo: "photos/survivor.jpg"
  },
];
