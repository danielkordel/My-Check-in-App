const mymap = L.map(document.getElementById('myMap')).setView([0, 0], 1); 
const attribution =
'&copy; <a href=https://www.openstreetmap.org/copyright>OpenStreetMap</a>';
// default format for tile Url: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

for(item of data){
  const marker = L.marker([item.lat, item.lon]).addTo(mymap);
  const txt = `<p>The weather here in ${item.lat}, ${item.lon} is ${item.weather} with a temperature of ${item.temp} &deg;C.</p>`
  marker.bindPopup(txt);
}

  // drukowanie pobranych danych na ekranie tekstem
//   for (item of data) {
//     const root = document.createElement('p');
//     const geo = document.createElement('div');
//     const date = document.createElement('div');

//     geo.textContent = `${item.lat}°, ${item.lon}°`;
//     const dateString = new Date(item.timestamp).toLocaleString();
//     date.textContent = dateString;

//     root.append( geo, date );
//     document.body.append(root);
//   }
  console.log(data);
}