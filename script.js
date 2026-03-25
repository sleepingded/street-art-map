var map = L.map('map').setView([54.0611381, 54.9323558], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
 maxZoom: 19
}).addTo(map);

fetch("artworks.json")
.then(response => response.json())
.then(data => {

 data.forEach(art => {

  var marker = L.marker([art.lat, art.lng], {icon: graffitiIcon}).addTo(map);

  marker.bindPopup(`
<div class="popup">

<img src="${art.image}" />

<h3>${art.name}</h3>

<p>${art.description}</p>

</div>
`);

 });

});

const graffitiIcon = L.icon({
iconUrl: "icons/spray.png",
iconSize: [32,32],
iconAnchor: [16,32]
});

// Кнопка добавить точку

// let addMode = false;

// document.getElementById("addPointBtn").onclick = function() {

//  addMode = true;
//  alert("Кликните на карту чтобы добавить точку");

// };

// map.on("click", function(e){

//  if(!addMode) return;

//  const lat = e.latlng.lat.toFixed(6);
//  const lng = e.latlng.lng.toFixed(6);

//  L.popup()
//   .setLatLng(e.latlng)
//   .setContent(`
//   <b>Новая точка</b><br>
//   Lat: ${lat}<br>
//   Lng: ${lng}<br><br>
//   Скопируйте координаты
//   `)
//   .openOn(map);

//  addMode = false;

// });
