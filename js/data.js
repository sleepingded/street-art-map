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

   Поле photos:
   Положи фото в папку photos/ рядом с index.html
   и укажи путь: ["photos/название_файла.jpg"]
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
    photos: ["photos/gagarin.jpg"]
  },
  {
    lat: 54.068713,
    lng: 54.934768,
    title: "Растаман",
    authors: ["LAZY aka Лентяй"],
    date: "2015-04",
    desc: "",
    photos: ["photos/tunnel.jpg"]
  },
  {
    lat: 54.068540,
    lng: 54.938609,
    title: "Арбуз",
    authors: ["LAZY aka Лентяй"],
    date: "2020-02",
    desc: "",
    photos: ["photos/watermelon.jpg"]
  },
  {
    lat: 54.069047, 
    lng: 54.935994,
    title: "Забор",
    authors: ["LAZY aka Лентяй"],
    date: "2021-06",
    desc: "",
    photos: ["photos/fence.jpg"]
  },
  {
    lat: 54.068271, 
    lng: 54.933794,
    title: "Мясо",
    authors: ["LAZY aka Лентяй"],
    date: "2021-11",
    desc: "",
    photos: ["photos/meat.jpg"]
  },
  {
    lat: 54.059694, 
    lng: 54.929119,
    title: "Гомер",
    authors: ["LAZY aka Лентяй"],
    date: "2016-07",
    desc: "",
    photos: ["photos/homer_1.jpg"]
  },
  {
    lat: 54.079424, 
    lng: 54.928458,
    title: "Рыба",
    authors: ["LAZY aka Лентяй"],
    date: "2016-03",
    desc: "",
    photos: ["photos/fish.jpg"]
  },
  {
    lat: 54.064474, 
    lng: 54.924015,
    title: "Магаз",
    authors: ["LAZY aka Лентяй", "Graff"],
    date: "2015-09",
    desc: "",
    photos: ["photos/store.jpg"]
  },
  {
    lat: 54.069708, 
    lng: 54.926426,
    title: "Енот",
    authors: ["LAZY aka Лентяй"],
    date: "2015-07-11",
    desc: "",
    photos: ["photos/raccon.jpg"]
  },
  {
    title: "Курение убивает",
    authors: ["LAZY aka Лентяй"],
    date: "2022-05",
    // destroyed: true,
    desc: "Точное местоположение неизвестно",
    photos: ["photos/smoking.jpg"]
  },
  {
    lat: 54.069708, 
    lng: 54.926426,
    title: "Выживыший",
    authors: ["LAZY aka Лентяй"],
    date: "2016-06-06",
    desc: "",
    photos: ["photos/survivor.jpg"]
  },
  {
    lat: 54.071780,
    lng: 54.913800,
    title: "Хэллоуин",
    authors: ["LAZY aka Лентяй"],
    date: "2016-10-28",
    desc: "",
    photos: ["photos/pumpkin.jpg"]
  },
  {
    lat: 54.070768, 
    lng: 54.913177,
    title: "Гарфилд",
    authors: ["LAZY aka Лентяй"],
    date: "2017-07-08",
    desc: "",
    photos: ["photos/garfield_1.jpg", "photos/garfield_2.jpg"]
  },
  {
    lat: 54.070836,  
    lng: 54.943891,
    title: "Пули",
    authors: ["LAZY aka Лентяй"],
    date: "2016-04-23",
    desc: "",
    photos: ["photos/bullets_1.jpg", "photos/bullets_2.jpg"]
  },
  {
    lat: 54.070836,  
    lng: 54.943891,
    title: "Свинья",
    authors: ["LAZY aka Лентяй"],
    date: "2018-09-04",
    desc: "",
    photos: ["photos/pig_1.jpg"]
  },
  {
    lat: 54.070836,  
    lng: 54.943891,
    title: "Ной",
    authors: ["Noy"],
    date: "2018-09-21",
    desc: "",
    photos: ["photos/noy_one.jpg"]
  },
  {
    lat: 54.068677, 
    lng: 54.935669,
    title: "Че",
    authors: ["LAZY aka Лентяй"],
    date: "2015-08-05",
    desc: "",
    photos: ["photos/che_1.jpg", "photos/che_2.jpg"]
  },
  {
    lat: 54.068677, 
    lng: 54.935669,
    title: "С днем победы",
    authors: ["LAZY aka Лентяй"],
    date: "2020-05-08",
    desc: "",
    photos: ["photos/victory_day.jpg"]
  },
  {
    lat: 54.070906, 
    lng: 54.923647,
    title: "Дружба",
    authors: ["LAZY aka Лентяй", "Graff"],
    date: "2015-10-20",
    desc: "",
    photos: ["photos/friendship_1.jpg"]
  },
  {
    lat: 54.064758, 
    lng: 54.920939,
    title: "Гараж",
    authors: ["LAZY aka Лентяй"],
    date: "",
    desc: "",
    photos: ["photos/garage_1.jpg"]
  },
  {
    lat: 54.065344, 
    lng: 54.923347,
    title: "LOVE",
    authors: ["LAZY aka Лентяй"],
    date: "",
    desc: "",
    photos: ["photos/love.jpg"]
  },
  {
    lat: 54.065344, 
    lng: 54.923347,
    title: "Панк",
    authors: ["LAZY aka Лентяй"],
    date: "",
    desc: "",
    photos: ["photos/punk.jpg"]
  },
  {
    lat: 54.069953,  
    lng: 54.921046,
    title: "Грязь",
    authors: ["LAZY aka Лентяй"],
    date: "2015-01-24",
    desc: "",
    photos: ["photos/mud.jpg"]
  },
  {
    lat: 54.068618, 
    lng: 54.943030,
    title: "70 лет победы",
    authors: ["LAZY aka Лентяй"],
    date: "2015-05-09",
    desc: "",
    photos: ["photos/70_victory.jpg"]
  },
  {
    lat: 54.068859, 
    lng: 54.937414,
    title: "Интернет",
    authors: ["LAZY aka Лентяй"],
    date: "2016-04-28",
    desc: "",
    photos: ["photos/elevator_1.jpg", "photos/elevator_2.jpg"]
  },
];
