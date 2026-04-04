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
    status: "exists",
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
    // status: "destroyed",
    desc: "Точное местоположение неизвестно",
    photos: ["photos/smoking_1.jpg", "photos/smoking_2.jpg"]
  },
  {
    lat: 54.069708, 
    lng: 54.926426,
    title: "Выживший",
    authors: ["LAZY aka Лентяй"],
    date: "2016-06-09",
    desc: "",
    photos: ["photos/survivor_1.jpg", "photos/survivor_2.jpg"]
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
    photos: ["photos/friendship_1.jpg", "photos/friendship_2.jpg"]
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
    status: "destroyed",
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
    status: "destroyed",
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
    status: "destroyed",
    desc: "Закрашен автором для граффити [[Цой]]",
    photos: ["photos/selfportrait.jpg"]
  },
  {
    lat: 54.066412, 
    lng: 54.922119,
    title: "Быть свободным",
    authors: ["LAZY aka Лентяй"],
    date: "2015-08-02",
    status: "destroyed",
    desc: "Где-то перед первой школой",
    photos: ["photos/be_free_1.jpg", "photos/be_free_2.jpg"]
  },
  {
    lat: 54.068677, 
    lng: 54.935669,
    title: "Растаман 2",
    authors: ["LAZY aka Лентяй"],
    date: "2015-08-02",
    status: "destroyed",
    desc: "Заменено на граффити [[С днем победы]]",
    photos: ["photos/rastaman_1.jpg", "photos/rastaman_2.jpg"]
  },
  {
    lat: 54.068916,
    lng: 54.930149,
    title: "Цой",
    authors: ["LAZY aka Лентяй","Graff", "Mr. S"],
    date: "2015-09-06",
    status: "destroyed",
    desc: "Закрашен, заменен на [[Деньги зло]]",
    photos: ["photos/soy.jpg"]
  },
  {
    lat: 54.068916,
    lng: 54.930149,
    title: "Деньги зло",
    authors: ["LAZY aka Лентяй","Noy"],
    date: "2019-01-20",
    desc: "",
    photos: ["photos/money_1.jpg", "photos/money_2.jpg"]
  },
  {
    title: "Пикачу",
    authors: ["LAZY aka Лентяй","Graff"],
    date: "2015-10-04",
    desc: "",
    photos: ["photos/pikachu_1.jpg", "photos/pikachu_2.jpg"]
  },
  {
    title: "Худи",
    authors: ["LAZY aka Лентяй","Graff"],
    date: "2015-10-27",
    desc: "Где-то на заброшке рядом с сельсоветом",
    photos: ["photos/hoodie_1.jpg", "photos/hoodie_2.jpg"]
  },
  {
    title: "Партнер",
    authors: ["LAZY aka Лентяй"],
    date: "2015-11-05",
    desc: "Где-то на заброшке возле партнера",
    photos: ["photos/partner_1.jpg", "photos/partner_2.jpg"]
  },
  {
    lat: 54.069697, 
    lng: 54.920573,
    title: "Боб Марли",
    authors: ["LAZY aka Лентяй","Graff"],
    date: "2015-11-29",
    status: "destroyed",
    desc: "Не уверен по координатам",
    photos: ["photos/bob_marley.jpg"]
  },
  {
    lat: 54.069697, 
    lng: 54.920573,
    title: "Окси",
    authors: ["LAZY aka Лентяй"],
    date: "2016-08-13",
    status: "destroyed",
    desc: "Не уверен по координатам",
    photos: ["photos/oxy_1.jpg", "photos/oxy_2.jpg"]
  },
  {
    title: "Влюбляйся с умом",
    authors: ["LAZY aka Лентяй", "Graff"],
    date: "2016-02-27",
    desc: "",
    photos: ["photos/think_twice.jpg"]
  },
  {
    title: "Дэдпул",
    authors: ["LAZY aka Лентяй"],
    date: "2016-02-27",
    desc: "Где-то возле второй школы, рядом с хоккейной коробкой",
    photos: ["photos/deadpool.jpg"]
  },
  {
    title: "Танк",
    authors: ["LAZY aka Лентяй", "Graff"],
    date: "2016-05-10",
    desc: "",
    photos: ["photos/tank_1.jpg","photos/tank_2.jpg"]
  },
  {
    title: "Инфинити пати",
    authors: ["LAZY aka Лентяй"],
    date: "2016-09-09",
    desc: "Ребят, кто знает что это было за пати и где оно проходило?",
    photos: ["photos/infinity_1.jpg","photos/infinity_2.jpg", "photos/infinity_3.jpg"]
  },
  {
    lat: 54.068740,
    lng: 54.922630,
    title: "Камо",
    authors: ["LAZY aka Лентяй"],
    date: "2016-10-14",
    status: "destroyed",
    desc: "Заменено на [[Гагарин]]",
    photos: ["photos/camo_1.jpg", "photos/camo_2.jpg"]
  },
  {
    title: "Свобода",
    authors: ["LAZY aka Лентяй"],
    date: "2017-11-22",
    desc: "Где-то позади бывшей бани возле мечети",
    photos: ["photos/freedom_1.jpg","photos/freedom_2.jpg"]
  },
  {
    lat: 54.07083333458083,
    lng: 54.930950783288765,
    title: "Ф. Кастро",
    authors: ["LAZY aka Лентяй", "Blik"],
    date: "2016-12-03",
    status: "destroyed",
    desc: "Закрашено",
    photos: ["photos/castro_1.jpg","photos/castro_2.jpg"]
  },
  {
    lat: 54.06799281534498, 
    lng: 54.93992787520538,
    title: "БЛИК",
    authors: ["Blik"],
    date: "2016-11-08",
    status: "destroyed",
    desc: "Где-то позади бывшего кафе'Колос'",
    photos: ["photos/blik_1.jpg","photos/blik_2.jpg"]
  },
  {
    title: "С новым годом",
    authors: ["LAZY aka Лентяй"],
    date: "2016-12-29",
    desc: "Возле графити [[Танк]]",
    photos: ["photos/happy_ny_1.jpg","photos/happy_ny_2.jpg"]
  },
  {
    lat: 54.0669434981977, 
    lng: 54.92596661123555,
    title: "Джейк",
    authors: ["LAZY aka Лентяй"],
    date: "2017-01-25",
    status: "exists",
    desc: "",
    photos: ["photos/jake_1.jpg","photos/jake_2.jpg"]
  },
  {
    title: "Идея",
    authors: ["LAZY aka Лентяй"],
    date: "2017-03-19",
    status: "unconfirmed",
    desc: "",
    photos: ["photos/idea_1.jpg","photos/idea_2.jpg"]
  },
  {
    lat: 54.0689843613561, 
    lng: 54.92990209902299,
    title: "Красло",
    authors: ["LAZY aka Лентяй"],
    date: "2017-05-31",
    status: "unconfirmed",
    desc: "По координатам не уверен",
    photos: ["photos/paint_1.jpg","photos/paint_2.jpg"]
  },
  {
    lat: 54.0689843613561, 
    lng: 54.92990209902299,
    title: "БЛИК 2",
    authors: ["Blik"],
    date: "2017-05-31",
    status: "unconfirmed",
    desc: "По координатам не уверен",
    photos: ["photos/paint_3.jpg"]
  },
  {
    title: "Выйди за рамки",
    authors: ["LAZY aka Лентяй"],
    date: "2017-11-01",
    status: "unconfirmed",
    desc: "Где-то возле второй школы",
    photos: ["photos/go_beyond_1.jpg","photos/go_beyond_2.jpg"]
  },
  {
    title: "Открытия",
    authors: ["LAZY aka Лентяй"],
    date: "2017-11-07",
    status: "unconfirmed",
    desc: "",
    photos: ["photos/openings.jpg"]
  },
  {
    title: "Призрак улиц",
    authors: ["LAZY aka Лентяй"],
    date: "2017-12-02",
    status: "unconfirmed",
    desc: "",
    photos: ["photos/town_ghosts.jpg"]
  },
  {
    title: "Не примыкай к серой массе",
    authors: ["LAZY aka Лентяй"],
    date: "2017-12-12",
    status: "unconfirmed",
    desc: "",
    photos: ["photos/new_grey_mass.jpg"]
  },
  {
    title: "Айкью",
    authors: ["LAZY aka Лентяй"],
    date: "2017-12-26",
    status: "unconfirmed",
    desc: "",
    photos: ["photos/iq.jpg"]
  },
  {
    title: "Бонг",
    authors: ["LAZY aka Лентяй"],
    date: "2018-02-10",
    status: "unconfirmed",
    desc: "",
    photos: ["photos/bong_1.jpg", "photos/bong_2.jpg"]
  },
  {
    title: "Мне не до сна",
    authors: ["LAZY aka Лентяй"],
    date: "2018-02-12",
    status: "unconfirmed",
    desc: "",
    photos: ["photos/sleep.jpg"]
  },
  {
    title: "Всем love",
    authors: ["LAZY aka Лентяй"],
    date: "2018-02-14",
    status: "unconfirmed",
    desc: "",
    photos: ["photos/plush_bear.jpg"]
  },
  {
    title: "Алкоголь",
    authors: ["LAZY aka Лентяй"],
    date: "2018-04-04",
    status: "unconfirmed",
    desc: "",
    photos: ["photos/alcohol.jpg"]
  },
  {
    lat: 54.068562938314884, 
    lng: 54.936439322576064,
    title: "Попробуй мне запретить",
    authors: ["LAZY aka Лентяй"],
    date: "2018-05-19",
    status: "destroyed",
    desc: "",
    photos: ["photos/try_to_ban_1.jpg", "photos/try_to_ban_2.jpg"]
  },
  {
    lat: 54.068562938314884, 
    lng: 54.936439322576064,
    title: "Ной 2",
    authors: ["Noy"],
    date: "2018-05-19",
    status: "destroyed",
    desc: "",
    photos: ["photos/second_noy_1.jpg", "photos/second_noy_1.jpg"]
  },
  {
    lat: 54.068562938314884, 
    lng: 54.936439322576064,
    title: "Ной 3",
    authors: ["Noy"],
    date: "2018-10-13",
    status: "destroyed",
    desc: "",
    photos: ["photos/third_noy_1.jpg"]
  },
  {
    lat: 54.068562938314884, 
    lng: 54.936439322576064,
    title: "Розы",
    authors: ["LAZY aka Лентяй"],
    date: "2018-10-13",
    status: "destroyed",
    desc: "",
    photos: ["photos/roses_1.jpg", "photos/roses_2.jpg"]
  },
  {
    lat: 54.068562938314884, 
    lng: 54.936439322576064,
    title: "Убить время",
    authors: ["LAZY aka Лентяй"],
    date: "2019-07-19",
    status: "destroyed",
    desc: "",
    photos: ["photos/time_killer_1.jpg", "photos/time_killer_2.jpg"]
  },
  {
    title: "VK ТОЧКА COM",
    authors: ["LAZY aka Лентяй"],
    date: "2018-06-01",
    status: "unconfirmed",
    desc: "",
    photos: ["photos/vk.jpg"]
  },
  {
    lat: 54.071833, 
    lng: 54.921480,
    title: "Делать то, что запрещено",
    authors: ["LAZY aka Лентяй"],
    date: "2018-05-19",
    status: "painted_over",
    desc: "",
    photos: ["photos/forbidden_1.jpg", "photos/forbidden_2.jpg"]
  },
  {
    lat: 54.071833, 
    lng: 54.921480,
    title: "Гарфилд 2",
    authors: ["LAZY aka Лентяй"],
    date: "2018-09-16",
    status: "painted_over",
    desc: "",
    photos: ["photos/second_garfield_1.jpg", "photos/second_garfield_2.jpg"]
  },
  {
    lat: 54.071833, 
    lng: 54.921480,
    title: "Смайл",
    authors: ["LAZY aka Лентяй"],
    date: "2020-07-03",
    status: "painted_over",
    desc: "",
    photos: ["photos/orange_1.jpg"]
  },
  {
    title: "Телефон",
    authors: ["LAZY aka Лентяй"],
    date: "2018-11-19",
    status: "unconfirmed",
    desc: "Рядом с [[Пикачу]]",
    photos: ["photos/phone_1.jpg", "photos/phone_2.jpg"]
  },
  {
    title: "Мозги",
    authors: ["LAZY aka Лентяй"],
    date: "2018-12-31",
    status: "unconfirmed",
    desc: "",
    photos: ["photos/brains_1.jpg", "photos/brains_2.jpg"]
  },
  {
    title: "Интернет",
    authors: ["LAZY aka Лентяй", "Noy"],
    date: "2019-05-07",
    status: "unconfirmed",
    desc: "",
    photos: ["photos/internet.jpg"]
  },
  {
    title: "Кусок",
    authors: ["LAZY aka Лентяй"],
    date: "2019-06-02",
    status: "unconfirmed",
    desc: "",
    photos: ["photos/peace.jpg"]
  },
  {
    lat: 54.068634, 
    lng: 54.934385,
    title: "Жизнь-Смерть",
    authors: ["LAZY aka Лентяй"],
    date: "2019-06-28",
    status: "destroyed",
    desc: "",
    photos: ["photos/life.jpg"]
  },
  {
    lat: 54.06607804013907, 
    lng: 54.91957796352922,
    title: "Туалет",
    authors: ["LAZY aka Лентяй"],
    date: "2019-10-13",
    status: "painted_over",
    desc: "",
    photos: ["photos/toilet_1.jpg", "photos/toilet_2.jpg"]
  },
  {
    title: "Книга",
    authors: ["LAZY aka Лентяй"],
    date: "2019-10-26",
    status: "unconfirmed",
    desc: "Книги - пища для ума 📕",
    photos: ["photos/book_1.jpg"]
  },
  {
    title: "Говно",
    authors: ["LAZY aka Лентяй"],
    date: "2018-10-03",
    status: "unconfirmed",
    desc: "",
    photos: ["photos/govno.jpg"]
  },
  {
    title: "Жопа",
    authors: ["LAZY aka Лентяй"],
    date: "2018-07-07",
    status: "destroyed",
    desc: "",
    photos: ["photos/jopa.jpg"]
  },
];
