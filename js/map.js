/* ══════════════════════════════════════════════════════════
   ЛОГИКА КАРТЫ И ПАНЕЛИ
   Этот файл менять не нужно — только если хочешь
   изменить поведение карты или панели.
   ══════════════════════════════════════════════════════════ */

/* ─── ФОРМАТИРОВАНИЕ ДАТЫ ──────────────────────────────── */

function formatDate(raw) {
  if (!raw) return '—';

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
      openClusterPopup(group);
    } else {
      openPanel(group[0].obj, group[0].i);
    }
  });
});

/* ─── ПОПАП КЛАСТЕРА ───────────────────────────────────── */

const clusterPopup     = document.getElementById('cluster-popup');
const clusterPopupList = document.getElementById('cluster-popup-list');

function openClusterPopup(group) {
  closePanel();
  clusterPopupList.innerHTML = '';

  group.forEach(({ obj, i }) => {
    const li = document.createElement('li');
    const authorStr = obj.authors && obj.authors.length > 0
      ? obj.authors.join(', ')
      : 'неизвестен';
    li.innerHTML = `
      <div class="cluster-item-title">${obj.title}</div>
      <div class="cluster-item-meta">${[authorStr, fmtDate(obj.date)].filter(s => s && s !== '—').join(' · ')}${obj.destroyed ? ' · <span style="color:var(--accent2)">уничтожено</span>' : ''}</div>
    `;
    li.addEventListener('click', () => {
      closeClusterPopup();
      openPanel(obj, i);
    });
    clusterPopupList.appendChild(li);
  });

  clusterPopup.classList.add('open');
}

function closeClusterPopup() {
  clusterPopup.classList.remove('open');
}

document.getElementById('cluster-popup-close').addEventListener('click', closeClusterPopup);
map.on('click', closeClusterPopup);

/* ─── СПИСОК ОБЪЕКТОВ ──────────────────────────────────── */

const listPanel  = document.getElementById('list-panel');
const listToggle = document.getElementById('list-toggle');
const listClose  = document.getElementById('list-close');
const listItems  = document.getElementById('list-items');

// Состояние сортировки и фильтров
let currentSort   = 'date-desc';
let activeAuthors = new Set();

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

  const thumb = obj.photo
    ? `<img class="list-item-thumb" src="${obj.photo}" alt="" />`
    : `<div class="list-item-thumb-placeholder"></div>`;

  const authorStr = obj.authors && obj.authors.length > 0
    ? obj.authors.join(', ')
    : 'неизвестен';
  const metaParts = [authorStr, fmtDate(obj.date)].filter(s => s && s !== '—');

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
  if (activeAuthors.size === 0) return arr;
  return arr.filter(({ obj }) =>
    obj.authors && obj.authors.some(a => activeAuthors.has(a))
  );
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
}

listToggle.addEventListener('click', () => {
  listPanel.classList.contains('open') ? closeList() : openList();
});

listClose.addEventListener('click', closeList);

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

  // Фото или заглушка
  const img = document.getElementById('panel-img');
  const ph  = document.getElementById('panel-placeholder');
  if (obj.photo) {
    img.src = obj.photo;
    img.style.display = 'block';
    ph.style.display  = 'none';
  } else {
    img.style.display = 'none';
    ph.style.display  = 'flex';
  }

  document.getElementById('panel-title').textContent = obj.title;
  document.getElementById('panel-desc').textContent  = obj.desc;

  // Пометка «уничтожено»
  const existingBadge = document.getElementById('destroyed-badge');
  if (existingBadge) existingBadge.remove();
  const titleEl = document.getElementById('panel-title');
  if (obj.destroyed) {
    titleEl.classList.add('is-destroyed');
    const badge = document.createElement('div');
    badge.id = 'destroyed-badge';
    badge.className = 'destroyed-badge';
    badge.textContent = 'уничтожено';
    titleEl.insertAdjacentElement('beforebegin', badge);
  } else {
    titleEl.classList.remove('is-destroyed');
  }

  // Авторы
  const authorsEl = document.getElementById('panel-authors');
  authorsEl.innerHTML = '';
  if (obj.authors && obj.authors.length > 0) {
    obj.authors.forEach(a => {
      const tag = document.createElement('span');
      tag.className = 'author-tag';
      tag.textContent = a;
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

  // Открываем панель
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

// Клик по фото в панели открывает лайтбокс
document.getElementById('panel-img').addEventListener('click', function () {
  if (this.src) openLightbox(this.src);
});
document.getElementById('close-btn').addEventListener('click', closePanel);
overlay.addEventListener('click', () => {
  closePanel();
  closeList();
});
map.on('click', closePanel);
