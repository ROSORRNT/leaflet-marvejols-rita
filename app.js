const clients = [
    { name: 'CARTAILLAC Christiane', address: '44.55306832127302, 3.2896218999999998', phone: '0466322541/0678305185', info: '14 Rue Fourdoules, 48100 Marvejols' },
    { name: 'CRESPIN Marie-Thérèse', address: '44.55903850778246, 3.2904692233600525', phone: '0466320293/0643464926', info: '1 chemin du Géant, Résidence Le Gallion Bat B' },
    { name: 'DELMAS Solange', address: '44.545548244999026, 3.2836798656872483', phone: '0763157449', info: '19 bis avenue pierre semard' },
    { name: 'FAVIER Hugette', address: '44.54589203993583, 3.288250921740885', phone: '0607060499/0670154169', info: 'Adresse incomplète : Résidence les marronniers Bat b Promenade louis cabanette ' },
    { name: 'GODDE Monique', address: '44.554787274461056, 3.290394069084666', phone: '0637444892', info: '1bd du révérend père de jabrun Bat A' },
    { name: 'MOREL Evelyne', address: '44.55491436431867, 3.290470036852245 ', phone: '0466322355', info: '1bd du révérend père de jabrun, Rez de chaussée, Bat manquant' },
    { name: 'ROCHE Nadia', address: '44.56122134150269, 3.292225257671623', phone: '0637623738', info: '30bis boulevard théophile Roussel, 3ème étage, porte de droite' },
    { name: 'SEGURET Jean-Pierre', address: '44.55512176371929, 3.2922213945238763', phone: '0678275448', info: '2bis boulevard saint-dominique' }
];


const chezNous = {
    name: 'Chez nous', 
    address: '44.551869312231204, 3.2893576269776905', 
    phone: '0615239684', 
    info: "Je t'ai préparé un bon pain :)" 
};
function formatCoordinates(address) {
    return address.split(',').map(coord => parseFloat(coord));
}

const map = L.map('map').setView([44.5532621, 3.2901135], 17); // Initial position set to Paris

// Créer un nouvel icône avec la couleur que vous souhaitez
let greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  // Ajouter un marqueur avec l'icône à des coordonnées spécifiques

function createMarker(client, icon) {
    return L.marker(formatCoordinates(client.address), {icon: icon})
        .addTo(map)
        .bindPopup(`<b>${client.name}</b><br>Tel: ${client.phone}<br>${client.info}`);
}

let marker = createMarker(chezNous, greenIcon);

let colors = ['red', 'blue', 'green', 'purple', 'orange', 'darkred', 'lightred', 'beige', 'darkblue', 'darkgreen', 'cadetblue', 'darkpurple', 'white', 'pink', 'lightblue', 'lightgreen', 'gray', 'black', 'lightgray'];

let icons = colors.map(color => L.AwesomeMarkers.icon({markerColor: color}));

let coordinates = clients.map(client => formatCoordinates(client.address));

clients.forEach((client, index) => {
    let icon = icons[index % icons.length];
    createMarker(client, icon);
});

let route = L.Routing.control({
    waypoints: clients.map(client => L.latLng(formatCoordinates(client.address))),
    routeWhileDragging: true,
    show: false,
    createMarker: function() { return null; } // supprime les marqueurs par défaut
  }).addTo(map);
  
  
  


async function getCoordinates(address) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
    const data = await response.json();
    if (data.length > 0) {
        return [data[0].lat, data[0].lon];
    } else {
        throw new Error(`No results found for address: ${address}`);
    }
}

getCoordinates(`Marvejols`).then(console.log);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Path: service-worker.js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`));
    });
  }
  
