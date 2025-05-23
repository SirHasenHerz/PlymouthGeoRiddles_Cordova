import {RiddleManager} from './riddleManager.js';


    // Create a new Mappa instance
    const mappa = new Mappa('Leaflet');
    let myMap;
    let mapLoaded;

    // Options for map
    const options = {
        lat: 50.36544851633019,
        lng: -4.142467975616455,
        zoom: 16,
        style: //"http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        "https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png"
    };

    let canvas;

    let userMarker;
    let userTurfLocation;
    let wasUserInside = false;

    let riddleJSON;
    // polygon zones data - json
    let thehoe;
    let thebb;
    let zonePoly;
    let zoneActive;

    let riddleManager;
    let riddleCounter = 0;

    let distFromPoint;
    
    let trueSound = new Audio('data/aud/true.ogg');
    let falseSound = new Audio('data/aud/false.ogg');



const sketch = (p) => {  
    // This parses the JSON text file into a Javascript Object
    p.preload = () => {
        riddleJSON = p.loadJSON("data/LocationPoints.json");
        thehoe = p.loadJSON("data/thehoe.json");
        thebb = p.loadJSON("data/thebarbican.json");
    }

    p.setup = () =>{
        riddleManager = new RiddleManager(riddleJSON);

        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('map');

        // Create a tile map and overlay the canvas on top
        myMap = mappa.tileMap(options);
        myMap.overlay(canvas, onMapLoaded);




        /* DEBUG
        // Browser GeoLocation
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(gotPosition);
        } 

        // Android Geolocation - Cordova plugin
        document.addEventListener("deviceready", function() {
            navigator.geolocation.watchPosition(gotPosition);
        }); */
    }

    p.draw = () => {
        if (!mapLoaded || !userTurfLocation) return;
        p.clear();

        const checkUserInZone = turf.pointsWithinPolygon(userTurfLocation, zoneActive.features[0]);
        const isUserInside = checkUserInZone.features.length > 0;

        if (isUserInside !== wasUserInside) {
            if (!isUserInside) {
                zonePoly.openPopup();
                document.getElementById('riddleBox').style.display = 'none';

            } else {
                zonePoly.closePopup();
                document.getElementById('riddleBox').style.display = 'block';
            }

            wasUserInside = isUserInside;
        }
    }

    p.windowResized = () => {
        // work around - couldn't get map to resize properly
        document.getElementsByClassName('leaflet-container')[0].style.width = '100vw';
        document.getElementsByClassName('leaflet-container')[0].style.height = '100vh';
    }
}

new p5(sketch);


function updateRiddleClue(riddles) {
    let popupContent = riddles.map(riddle => `${riddle}`);
    document.getElementById('riddleText').innerHTML = popupContent;
}



// This function is called when the map is loaded and ready to be used. 
// It sets up the map and adds the markers.
function onMapLoaded() {
    zoneActive = thehoe;
    drawZone();

    myMap.map.zoomControl.setPosition('topright');

    let userIcon = L.icon({
        iconUrl: 'data/img/redpin.svg',
        iconSize: [38, 95],
        iconAnchor: [18, 75],
        popupAnchor: [1.5, -35],
    })
    userMarker = L.marker([50.36800630462228, -4.142342515956734], { icon: userIcon }).addTo(myMap.map);

    // DEBUG
    userMarker.on({
        mousedown: function() {
            myMap.map.on('mousedown', function(e) {
                gotPosition(e.latlng.lat, e.latlng.lng);
            });

        }
    });


    const activeClues = riddleManager.getActiveStates().map(state => state.clues);
    updateRiddleClue(activeClues);


    console.log("Map loaded");
    mapLoaded = true;

};

function drawZone() {
    zonePoly = L.geoJSON(zoneActive, {
        color: 'seagreen',
        opacity: 0.8
    }).addTo(myMap.map);

    zonePoly.bindPopup('<b>Please walk in this area to begin your journey!</b>', { autoPan: false, closeOnClick: false });
    zonePoly.openPopup();
} 

function gotPosition(latitude, longitude) {
    if (!mapLoaded) return;
    userMarker.setLatLng([latitude, longitude]);


    // Convert the LatLng to coordinates for turf.js
    let userCoords = L.GeoJSON.latLngToCoords(userMarker.getLatLng());
    userTurfLocation = turf.point(userCoords);
}


document.getElementById('buttonCheckLocation').addEventListener('click', checkRiddleSolved);

function checkRiddleSolved() {

    riddleManager.getActiveStates().forEach(state => {
        distFromPoint = 1000 * turf.distance(userTurfLocation, turf.point(state.coords));

        if (distFromPoint < 30) {
            riddleCounter++;
            state.arrivedAt();
            trueSound.play();

            const activeClues = riddleManager.getActiveStates().map(state => state.clues);
            updateRiddleClue(activeClues);


            if (riddleManager.checkFirstZoneCompleted() && zoneActive !== thebb) {
                zonePoly.remove();
                zoneActive = thebb;
                drawZone();
            }
            return;
        } else {
            falseSound.play();
        }
    });

    if (riddleManager.stateArray[12].visited == true) {
        document.getElementById('overlayContent').style.display = 'flex';
        document.getElementById('WinningScreen').style.display = 'flex';
    }
    

}