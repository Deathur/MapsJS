let latitude;
let longitude;
let ville;
let temperature;
const afficheTemperature = document.querySelector('.ville');

var map = L.map('map', {
  maxBounds: [
    [-85, -180],
    [85, 180]
  ],
  maxBoundsViscosity: 1.0 
}).setView([47, 5], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 3,
     noWrap: true,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on('click', function(event) {
    latitude = event.latlng.lat;
    longitude = event.latlng.lng;
    console.log(event.latlng.lat);
    console.log(event.latlng.lng);
    fetch (`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        if (data.address.hasOwnProperty("city")) {
            ville = data.address.city;
        }
        if (data.address.hasOwnProperty("village")) {
            ville = data.address.village;
        }
        if (ville !== "" || ville == undefined) {
            fetch (`https://goweather.xyz/weather/${ville}`)
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                temperature = data.temperature;
                afficheTemperature.innerText = `La température à ${ville} est de ${temperature}`;
                afficheTemperature.style.display = 'block';
                console.log(`La température à ${ville} est de ${temperature}`); 
            })
            ville = "";
        }
        else {
            console.log("aucune ville");
            
        }
        
    })
})