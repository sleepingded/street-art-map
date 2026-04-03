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
    authors: ["LAZY aka Лентяй"],
    date: "2017-04-12",
    desc: "В марте 2019 года было обновлено автором. Изначальный вид на 2-й картинке",
    photos: ["photos/gagarin_2.jpg", "photos/gagarin_1.jpg"]
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
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
  {
    title: "Крик",
    authors: ["LAZY aka Лентяй"],
    date: "2015-01-17",
    desc: "Где-то на территории третьей школы, возможно уничтожено",
    photos: ["photos/scream_1.jpg", "photos/scream_2.jpg"]
  },
  {
    title: "Барт",
    authors: ["LAZY aka Лентяй"],
    date: "2015-01-17",
    desc: "Возможно уничтожено",
    photos: ["photos/bart_1.jpg"]
  },
  {
    title: "Облака",
    authors: ["LAZY aka Лентяй"],
    date: "2015-04-25",
    desc: "Возможно уничтожено",
    photos: ["photos/clouds_1.jpg"]
  },
  {
    title: "8 марта",
    authors: ["LAZY aka Лентяй"],
    date: "2015-04-25",
    desc: "Надпись закрасили",
    photos: ["photos/eight_march.jpg"]
  },
  {
    title: "Всем привет",
    authors: ["LAZY aka Лентяй"],
    date: "2015-04-29",
    desc: "",
    photos: ["photos/hello.jpg"]
  },
  {
    title: "Серая масса",
    authors: ["LAZY aka Лентяй"],
    date: "2015-05-01",
    desc: "",
    photos: ["photos/grey_mass_1.jpg"]
  },
  {
    lat: 54.067456,
    lng: 54.922547,
    title: "Буковки",
    authors: ["LAZY aka Лентяй"],
    date: "2015-05-17",
    destroyed: true,
    desc: "Уничтожено через 5 часов после создания",
    photos: ["photos/letters.jpg"]
  },
  {
    title: "Цветочки",
    authors: ["LAZY aka Лентяй"],
    date: "2015-05-30",
    desc: "",
    photos: ["photos/flowers.jpg"]
  },
  {
    lat: 54.069493, 
    lng: 54.929930,
    title: "Кот",
    authors: ["LAZY aka Лентяй"],
    date: "2015-05-30",
    destroyed: true,
    desc: "",
    photos: ["photos/cat.jpg"]
  },
  {
    title: "Не будь мной",
    authors: ["LAZY aka Лентяй"],
    date: "2015-05-30",
    desc: "",
    photos: ["photos/dontbeme.jpg"]
  },
  {
    lat: 54.068916,
    lng: 54.930149,
    title: "Автопортрет",
    authors: ["LAZY aka Лентяй"],
    date: "2015-07-11",
    destroyed: true,
    desc: "Закрашен автором для граффити 'Цой'",
    photos: ["photos/selfportrait.jpg"]
  },
  {
    lat: 54.066412, 
    lng: 54.922119,
    title: "Быть свободным",
    authors: ["LAZY aka Лентяй"],
    date: "2015-08-02",
    destroyed: true,
    desc: "Где-то перед первой школой",
    photos: ["photos/be_free_1.jpg", "photos/be_free_2.jpg"]
  },
  {
    lat: 54.068677, 
    lng: 54.935669,
    title: "Растаман 2",
    authors: ["LAZY aka Лентяй"],
    date: "2015-08-02",
    destroyed: true,
    desc: "Заменено на граффити 'С днем победы'",
    photos: ["photos/rastaman_1.jpg", "photos/rastaman_2.jpg"]
  },
];
