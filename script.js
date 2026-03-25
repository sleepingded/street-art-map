var map = L.map('map').setView([54.0611381, 54.9323558], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
 maxZoom: 19
}).addTo(map);

fetch("artworks.json")
.then(response => response.json())
.then(data => {

 data.forEach(art => {

  var marker = L.marker([art.lat, art.lng]).addTo(map);

  marker.bindPopup(`
   <h3>${art.name}</h3>
   <img src="${art.image}" width="200">
   <p>${art.description}</p>
  `);

 });

});
