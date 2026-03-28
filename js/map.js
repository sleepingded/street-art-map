/* ══════════════════════════════════════════════════════════
   ЛОГИКА КАРТЫ И ПАНЕЛИ
   Этот файл менять не нужно — только если хочешь
   изменить поведение карты или панели.
   ══════════════════════════════════════════════════════════ */

/* ─── ИНИЦИАЛИЗАЦИЯ КАРТЫ ──────────────────────────────── */

// Центр карты вычисляется автоматически из всех точек
const center = ART_OBJECTS.length
  ? [
      ART_OBJECTS.reduce((s, o) => s + o.lat, 0) / ART_OBJECTS.length,
      ART_OBJECTS.reduce((s, o) => s + o.lng, 0) / ART_OBJECTS.length
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

ART_OBJECTS.forEach((obj, i) => {
  const icon = L.divIcon({
    className: '',
    html: `<div class="custom-marker" data-i="${i}"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  const marker = L.marker([obj.lat, obj.lng], { icon }).addTo(map);
  marker.on('click', () => openPanel(obj, i));
});

/* ─── ПАНЕЛЬ ───────────────────────────────────────────── */

const panel   = document.getElementById('panel');
const overlay = document.getElementById('overlay');

function openPanel(obj, idx) {
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

  // Текстовые поля
  document.getElementById('panel-title').textContent  = obj.title;
  document.getElementById('panel-desc').textContent   = obj.desc;
  document.getElementById('panel-author').textContent = obj.author || '—';
  document.getElementById('panel-date').textContent   = obj.date   || '—';

  // Открываем панель
  panel.classList.add('open');
  overlay.classList.add('visible');
}

function closePanel() {
  panel.classList.remove('open');
  overlay.classList.remove('visible');
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
overlay.addEventListener('click', closePanel);
map.on('click', closePanel);
