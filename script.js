/**
 * Initialisation des variables
 */
let latitude;
let longitude;
let ville = "";
let temperature;
let description;
let wind;
const afficheTemperature = document.querySelector('.ville');
/**
 * Limiter le déplacement hozizontal de la map
 */
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
/**
 * Lorsqu'on clique sur un endroit de la map
 */
map.on('click', function(event) {
    console.log(event);
    latitude = event.latlng.lat;
    longitude = event.latlng.lng;
    console.log(event.latlng.lat);
    console.log(event.latlng.lng);
    fetch (`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        
        /**
         * Vérification selon la taille de la ville + vérification des erreurs
         */
        if (data.hasOwnProperty('address')) {
            if (data.address.city) {
                ville = data.address.city;
            }
            if (data.address.town) {
                ville = data.address.town;
            }
            if (data.address.village) {
                ville = data.address.village;
            }
            if (ville !== "" || ville == undefined) {
                fetch (`https://goweather.xyz/weather/${ville}`)
                .then(response=>response.json())
                .then(data=>{
                    temperature = data.temperature;
                    description = data.description;
                    wind = data.wind;
                    /**
                     * On affiche les informations de la ville correpondante en dessous
                     */
                    afficheTemperature.innerText = `La température à ${ville} est de ${temperature} le temps est ${description} et le vent est de ${wind}`;
                    afficheTemperature.style.display = 'block';
                    console.log(`La température à ${ville} est de ${temperature} le temps est ${description} et le vent est de ${wind}`);
                    ville = "";
                })
            }
            /**
             * Cas où on sélectionne aucune ville (exemple: en plein océan)
             */
            else {
                console.log("aucune ville");
            }
        }
    })
})