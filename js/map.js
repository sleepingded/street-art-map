/* ══════════════════════════════════════════════════════════
   ЛОГИКА КАРТЫ И ПАНЕЛИ
   Этот файл менять не нужно — только если хочешь
   изменить поведение карты или панели.
   ══════════════════════════════════════════════════════════ */

/* ─── ИНИЦИАЛИЗАЦИЯ КАРТЫ ──────────────────────────────── */

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
      <div class="cluster-item-meta">${[authorStr, obj.date].filter(Boolean).join(' · ')}</div>
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

// Наполняем список
ART_OBJECTS.forEach((obj, i) => {
  const li = document.createElement('li');

  const noCoords = !obj.lat || !obj.lng;

  const thumb = obj.photo
    ? `<img class="list-item-thumb" src="${obj.photo}" alt="" />`
    : `<div class="list-item-thumb-placeholder"></div>`;

  const authorStr = obj.authors && obj.authors.length > 0
    ? obj.authors.join(', ')
    : 'неизвестен';
  const metaParts = [authorStr, obj.date].filter(Boolean);

  li.innerHTML = `
    ${thumb}
    <div class="list-item-info">
      <div class="list-item-title">${obj.title}</div>
      <div class="list-item-meta" data-date="${obj.date || ''}">${metaParts.join(' · ')}</div>
      ${noCoords ? '<div class="list-item-no-coords">координаты неизвестны</div>' : ''}
    </div>
  `;

  li.addEventListener('click', () => {
    if (!noCoords) map.setView([obj.lat, obj.lng], 16, { animate: true });
    openPanel(obj, i);
  });
  listItems.appendChild(li);
});

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
  document.getElementById('panel-date').textContent = obj.date || '—';

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
