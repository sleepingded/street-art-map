/* ══════════════════════════════════════════════════════════
   ЛОГИКА КАРТЫ И ПАНЕЛИ
   Этот файл менять не нужно — только если хочешь
   изменить поведение карты или панели.
   ══════════════════════════════════════════════════════════ */

/* ─── ИНФОРМАЦИОННОЕ ОКНО ──────────────────────────────── */

const aboutOverlay = document.getElementById('about-overlay');

function openAbout() {
  aboutOverlay.classList.remove('hidden');
}

function closeAbout() {
  aboutOverlay.classList.add('hidden');
}

document.getElementById('about-close').addEventListener('click', closeAbout);
document.getElementById('about-start').addEventListener('click', closeAbout);
document.getElementById('info-btn').addEventListener('click', openAbout);

// Закрытие по клику на затемнение
aboutOverlay.addEventListener('click', (e) => {
  if (e.target === aboutOverlay) closeAbout();
});

// Показываем только при первом посещении
if (!localStorage.getItem('about-seen')) {
  localStorage.setItem('about-seen', '1');
} else {
  closeAbout();
}


const headerEl = document.querySelector('header');
function setHeaderHeight() {
  document.documentElement.style.setProperty('--header-h', headerEl.offsetHeight + 'px');
}
setHeaderHeight();
window.addEventListener('resize', setHeaderHeight);

/* ─── ФОРМАТИРОВАНИЕ ДАТЫ ──────────────────────────────── */

function formatDate(raw) {
  if (!raw) return 'Неизвестно';

  const parts = raw.split('-');
  const year  = parts[0];
  const month = parts[1];

  if (!month) return year; // только год — выводим как есть

  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
  // Выводит: "июнь 2021" → делаем первую букву заглавной
}

// Первую букву заглавной: "июнь 2021" → "Июнь 2021"
function fmtDate(raw) {
  const str = formatDate(raw);
  return str.charAt(0).toUpperCase() + str.slice(1);
}



// Центр карты вычисляется только по объектам с координатами
const geoObjects = ART_OBJECTS.filter(o => o.lat && o.lng);

const center = geoObjects.length
  ? [
      geoObjects.reduce((s, o) => s + o.lat, 0) / geoObjects.length,
      geoObjects.reduce((s, o) => s + o.lng, 0) / geoObjects.length
    ]
  : [55.7558, 37.6173]; // запасной центр если точек нет

const map = L.map('map', {
  center,
  zoom: 14,
  zoomControl: false
});

// Тёмный тайл — CartoDB Dark Matter
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

// Кнопки зума — правый нижний угол
L.control.zoom({ position: 'bottomright' }).addTo(map);

/* ─── МАРКЕРЫ ──────────────────────────────────────────── */

document.getElementById('art-count').textContent = ART_OBJECTS.length;

let activeMarkerEl = null;

// Группируем объекты по координатам
const coordGroups = {};
ART_OBJECTS.forEach((obj, i) => {
  if (!obj.lat || !obj.lng) return;
  const key = `${obj.lat},${obj.lng}`;
  if (!coordGroups[key]) coordGroups[key] = [];
  coordGroups[key].push({ obj, i });
});

// Создаём один маркер на каждую уникальную точку
Object.values(coordGroups).forEach(group => {
  const { obj } = group[0];
  const isCluster = group.length > 1;
  const size = isCluster ? 26 : 20;

  const icon = L.divIcon({
    className: '',
    html: isCluster
      ? `<div class="custom-marker cluster">${group.length}</div>`
      : `<div class="custom-marker" data-i="${group[0].i}"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });

  const marker = L.marker([obj.lat, obj.lng], { icon }).addTo(map);

  marker.on('click', () => {
    if (isCluster) {
      openClusterList(group);
    } else {
      openPanel(group[0].obj, group[0].i);
    }
  });
});

/* ─── СПИСОК ОБЪЕКТОВ ──────────────────────────────────── */

const listPanel  = document.getElementById('list-panel');
const listToggle = document.getElementById('list-toggle');
const listClose  = document.getElementById('list-close');
const listTitle  = document.getElementById('list-title');
const listItems  = document.getElementById('list-items');

// Состояние сортировки и фильтров
let currentSort    = 'date-desc';
let activeAuthors  = new Set();
let locationFilter = null;

// Собираем уникальных авторов из всех объектов
const allAuthors = [...new Set(
  ART_OBJECTS.flatMap(o => o.authors && o.authors.length ? o.authors : [])
)].sort();

// Рендерим кнопки фильтра по авторам
const listAuthorsEl = document.getElementById('list-authors');
allAuthors.forEach(author => {
  const btn = document.createElement('button');
  btn.className = 'author-filter-btn';
  btn.textContent = author;
  btn.addEventListener('click', () => {
    if (activeAuthors.has(author)) {
      activeAuthors.delete(author);
      btn.classList.remove('active');
    } else {
      activeAuthors.add(author);
      btn.classList.add('active');
    }
    renderList();
  });
  listAuthorsEl.appendChild(btn);
});

// Кнопки сортировки
document.querySelectorAll('.sort-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSort = btn.dataset.sort;
    renderList();
  });
});

function sortObjects(arr) {
  const sorted = [...arr];
  if (currentSort === 'date-desc') {
    sorted.sort((a, b) => (b.obj.date || '').localeCompare(a.obj.date || ''));
  } else if (currentSort === 'date-asc') {
    sorted.sort((a, b) => (a.obj.date || '').localeCompare(b.obj.date || ''));
  } else if (currentSort === 'title') {
    sorted.sort((a, b) => a.obj.title.localeCompare(b.obj.title, 'ru'));
  }
  return sorted;
}
function createListItem(obj, i) {
  const li = document.createElement('li');
  const noCoords = !obj.lat || !obj.lng;

  const firstPhoto = obj.photos && obj.photos.length ? obj.photos[0] : null;
  const thumb = firstPhoto
    ? `<img class="list-item-thumb" src="${firstPhoto}" alt="" />`
    : `<div class="list-item-thumb-placeholder"></div>`;

  const authorStr = obj.authors && obj.authors.length > 0
    ? obj.authors.join(', ')
    : 'неизвестен';
  const formattedDate = fmtDate(obj.date);
  const metaParts = [authorStr, formattedDate !== 'Неизвестно' ? formattedDate : null].filter(Boolean);

  li.innerHTML = `
    ${thumb}
    <div class="list-item-info">
      <div class="list-item-title">${obj.title}</div>
      <div class="list-item-meta" data-date="${obj.date || ''}">${metaParts.join(' · ')}</div>
      ${obj.destroyed ? '<div class="list-item-no-coords" style="color:var(--accent2)">уничтожено</div>' : ''}
      ${noCoords ? '<div class="list-item-no-coords">координаты неизвестны</div>' : ''}
    </div>
  `;

  li.addEventListener('click', () => {
    if (!noCoords) map.setView([obj.lat, obj.lng], 16, { animate: true });
    openPanel(obj, i);
  });

  return li;
}

// Сортировка
function sortObjects(arr) {
  const sorted = [...arr];
  if (currentSort === 'date-desc') {
    sorted.sort((a, b) => (b.obj.date || '').localeCompare(a.obj.date || ''));
  } else if (currentSort === 'date-asc') {
    sorted.sort((a, b) => (a.obj.date || '').localeCompare(b.obj.date || ''));
  } else if (currentSort === 'title') {
    sorted.sort((a, b) => a.obj.title.localeCompare(b.obj.title, 'ru'));
  }
  return sorted;
}

// Фильтрация
function filterObjects(arr) {
  let result = arr;
  if (locationFilter) {
    result = result.filter(({ i }) => locationFilter.indices.includes(i));
  }
  if (activeAuthors.size > 0) {
    result = result.filter(({ obj }) =>
      obj.authors && obj.authors.some(a => activeAuthors.has(a))
    );
  }
  return result;
}

// Открыть список отфильтрованный по точке на карте
function openClusterList(group) {
  locationFilter       = { indices: group.map(({ i }) => i) };
  listTitle.textContent = `На этой точке (${group.length})`;
  document.getElementById('list-controls').style.display = 'none';
  renderList();
  openList();
}

// Главная функция — перерисовываем список
function renderList() {
  listItems.innerHTML = '';
  const indexed = ART_OBJECTS.map((obj, i) => ({ obj, i }));
  const filtered = filterObjects(indexed);
  const sorted   = sortObjects(filtered);
  sorted.forEach(({ obj, i }) => {
    listItems.appendChild(createListItem(obj, i));
  });
}

// Первичный рендер
renderList();



const isMobile = () => window.innerWidth <= 600;

function openList() {
  if (isMobile()) closePanel();
  listPanel.classList.add('open');
  listToggle.classList.add('active');
  overlay.classList.add('visible');
}

function closeList() {
  listPanel.classList.remove('open');
  listToggle.classList.remove('active');
  if (!panel.classList.contains('open')) overlay.classList.remove('visible');
  // Сбрасываем фильтр по точке при каждом закрытии
  locationFilter = null;
  listTitle.textContent = 'Все объекты';
  document.getElementById('list-controls').style.display = '';
  renderList();
}

listToggle.addEventListener('click', () => {
  listPanel.classList.contains('open') ? closeList() : openList();
});

listClose.addEventListener('click', closeList);

/* ─── ГАЛЕРЕЯ ───────────────────────────────────────────── */

const galleryImg     = document.getElementById('panel-img');
const galleryPh      = document.getElementById('panel-placeholder');
const galleryPrev    = document.getElementById('gallery-prev');
const galleryNext    = document.getElementById('gallery-next');
const galleryCounter = document.getElementById('gallery-counter');

let galleryPhotos = [];
let galleryIndex  = 0;

function initGallery(photos) {
  galleryPhotos = photos;
  galleryIndex  = 0;
  renderGallery();
}

function renderGallery() {
  const total = galleryPhotos.length;

  if (total === 0) {
    galleryImg.style.display     = 'none';
    galleryPh.style.display      = 'flex';
    galleryPrev.style.display    = 'none';
    galleryNext.style.display    = 'none';
    galleryCounter.style.display = 'none';
    return;
  }

  galleryImg.src               = galleryPhotos[galleryIndex];
  galleryImg.style.display     = 'block';
  galleryPh.style.display      = 'none';

  const hasMany = total > 1;
  galleryPrev.style.display    = hasMany ? 'flex' : 'none';
  galleryNext.style.display    = hasMany ? 'flex' : 'none';
  galleryCounter.style.display = hasMany ? 'block' : 'none';
  galleryCounter.textContent   = `${galleryIndex + 1} / ${total}`;
}

galleryPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  galleryIndex = (galleryIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
  renderGallery();
});

galleryNext.addEventListener('click', (e) => {
  e.stopPropagation();
  galleryIndex = (galleryIndex + 1) % galleryPhotos.length;
  renderGallery();
});

// Клик по фото открывает лайтбокс
galleryImg.addEventListener('click', () => {
  if (galleryImg.src) openLightbox(galleryImg.src);
});

/* ─── ПАНЕЛЬ ───────────────────────────────────────────── */

const panel   = document.getElementById('panel');
const overlay = document.getElementById('overlay');

function openPanel(obj, idx) {
  // На мобильном закрываем список
  if (isMobile()) closeList();

  // Переключаем активный маркер
  if (activeMarkerEl) activeMarkerEl.classList.remove('active');
  activeMarkerEl = document.querySelector(`.custom-marker[data-i="${idx}"]`);
  if (activeMarkerEl) activeMarkerEl.classList.add('active');

  // Галерея
  const photos = obj.photos && obj.photos.length ? obj.photos : [];
  initGallery(photos);

  document.getElementById('panel-title').textContent = obj.title;
  // Описание с поддержкой [[Ссылок на объекты]]
  const descEl = document.getElementById('panel-desc');
  const rawDesc = obj.desc || '';
  if (!rawDesc) {
    descEl.textContent = 'Описание отсутствует';
    descEl.style.color = 'var(--muted)';
  } else {
    descEl.style.color = '';
    // Разбиваем текст по паттерну [[...]]
    const parts = rawDesc.split(/(\[\[.+?\]\])/g);
    descEl.innerHTML = '';
    parts.forEach(part => {
      const match = part.match(/^\[\[(.+?)\]\]$/);
      if (match) {
        const targetTitle = match[1];
        const targetIdx   = ART_OBJECTS.findIndex(o => o.title === targetTitle);
        if (targetIdx !== -1) {
          const link = document.createElement('span');
          link.className   = 'desc-link';
          link.textContent = targetTitle;
          link.addEventListener('click', () => {
            openPanel(ART_OBJECTS[targetIdx], targetIdx);
            if (ART_OBJECTS[targetIdx].lat && ART_OBJECTS[targetIdx].lng) {
              map.setView([ART_OBJECTS[targetIdx].lat, ART_OBJECTS[targetIdx].lng], 16, { animate: true });
            }
          });
          descEl.appendChild(link);
        } else {
          // Объект не найден — показываем текст без ссылки
          descEl.appendChild(document.createTextNode(targetTitle));
        }
      } else {
        descEl.appendChild(document.createTextNode(part));
      }
    });
  }

  // Пометка «уничтожено»
  const existingBadge = document.getElementById('destroyed-badge');
  if (existingBadge) existingBadge.remove();
  const titleEl = document.getElementById('panel-title');
  if (obj.destroyed) {
    const badge = document.createElement('div');
    badge.id = 'destroyed-badge';
    badge.className = 'destroyed-badge';
    badge.textContent = 'уничтожено';
    titleEl.insertAdjacentElement('beforebegin', badge);
  }

  // Авторы — кликабельные теги если есть профиль
  const authorsEl = document.getElementById('panel-authors');
  authorsEl.innerHTML = '';
  if (obj.authors && obj.authors.length > 0) {
    obj.authors.forEach(a => {
      const tag = document.createElement('span');
      const hasProfile = AUTHORS && AUTHORS[a];
      tag.className = 'author-tag' + (hasProfile ? ' clickable' : '');
      tag.textContent = a;
      if (hasProfile) tag.addEventListener('click', () => openAuthorProfile(a));
      authorsEl.appendChild(tag);
    });
  } else {
    const tag = document.createElement('span');
    tag.className = 'author-tag unknown';
    tag.textContent = 'неизвестен';
    authorsEl.appendChild(tag);
  }

  // Дата
  document.getElementById('panel-date').textContent = fmtDate(obj.date);

  // Показываем карточку объекта, скрываем профиль
  document.getElementById('artwork-view').style.display = '';
  document.getElementById('author-view').style.display  = 'none';

  // Открываем панель
  panel.classList.add('open');
  if (isMobile()) overlay.classList.add('visible');
}

/* ─── ПРОФИЛЬ АВТОРА ───────────────────────────────────── */

function openAuthorProfile(name) {
  const author = AUTHORS[name];
  if (!author) return;

  // Фото или заглушка
  const photo = document.getElementById('author-photo');
  const ph    = document.getElementById('author-photo-placeholder');
  if (author.photo) {
    photo.src           = author.photo;
    photo.style.display = 'block';
    ph.style.display    = 'none';
  } else {
    photo.style.display = 'none';
    ph.style.display    = 'flex';
    ph.textContent      = name.charAt(0).toUpperCase();
  }

  // Имя и биография
  document.getElementById('author-name').textContent = author.name;
  const bioEl = document.getElementById('author-bio');
  bioEl.textContent = author.bio || 'Биография отсутствует';
  bioEl.style.color = author.bio ? '' : 'var(--muted)';

  // Ссылки
  const linksEl = document.getElementById('author-links');
  linksEl.innerHTML = '';
  (author.links || []).forEach(link => {
    const a = document.createElement('a');
    a.className = 'author-link';
    a.textContent = link.label;
    a.href        = link.url;
    a.target      = '_blank';
    a.rel         = 'noopener noreferrer';
    linksEl.appendChild(a);
  });

  // Скрываем карточку объекта, показываем профиль
  document.getElementById('artwork-view').style.display = 'none';
  document.getElementById('author-view').style.display  = 'flex';

  // Открываем панель если ещё не открыта
  panel.classList.add('open');
  if (isMobile()) overlay.classList.add('visible');
}

function closePanel() {
  panel.classList.remove('open');
  if (!listPanel.classList.contains('open')) overlay.classList.remove('visible');
  if (activeMarkerEl) {
    activeMarkerEl.classList.remove('active');
    activeMarkerEl = null;
  }
}

/* ─── ЛАЙТБОКС ────────────────────────────────────────── */

const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// Клик по фону лайтбокса закрывает его
lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) closeLightbox();
});

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

document.getElementById('close-btn').addEventListener('click', closePanel);
overlay.addEventListener('click', () => {
  closePanel();
  closeList();
});
map.on('click', closePanel);
