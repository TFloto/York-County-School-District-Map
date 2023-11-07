// ____           _____ _____ _____      __  __  ____  _____  _    _ _      ______  _____ 
//|  _ \   /\    / ____|_   _/ ____|    |  \/  |/ __ \|  __ \| |  | | |    |  ____|/ ____|
//| |_) | /  \  | (___   | || |         | \  / | |  | | |  | | |  | | |    | |__  | (___  
//|  _ < / /\ \  \___ \  | || |         | |\/| | |  | | |  | | |  | | |    |  __|  \___ \ 
//| |_) / ____ \ ____) |_| || |____     | |  | | |__| | |__| | |__| | |____| |____ ____) |
//|____/_/    \_\_____/|_____\_____|    |_|  |_|\____/|_____/ \____/|______|______|_____/ 
//Imports the basic modules required for the server to run

const express = require('express')
var app = express()
const path = require('path')
const ejs = require('ejs')
const bodyParser = require('body-parser')
var fs = require('fs');
const { json } = require('body-parser');

//  _____ ______ _______ _______ _____ _   _  _____  _____ 
///  ____|  ____|__   __|__   __|_   _| \ | |/ ____|/ ____|
//| (___ | |__     | |     | |    | | |  \| | |  __| (___  
// \___ \|  __|    | |     | |    | | | . ` | | |_ |\___ \ 
// ____) | |____   | |     | |   _| |_| |\  | |__| |____) |
//|_____/|______|  |_|     |_|  |_____|_| \_|\_____|_____/ 
//Sets up the listen server

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./static'))
app.use('/fonts', express.static(__dirname + '/fonts'));
var port = 1010
var ip = '127.0.0.1' //I don't know why this is here or if we need it. 
//listen server
app.listen(port, function () {
  console.log("Listening on port " + port)
})

// __  __          _____       _____        _____ ______ 
//|  \/  |   /\   |  __ \     |  __ \ /\   / ____|  ____|
//| \  / |  /  \  | |__) |    | |__) /  \ | |  __| |__   
//| |\/| | / /\ \ |  ___/     |  ___/ /\ \| | |_ |  __|  
//| |  | |/ ____ \| |         | |  / ____ \ |__| | |____ 
//|_|  |_/_/    \_\_|         |_| /_/    \_\_____|______|
//All the code that is required for OpenStreetMap to work on /districts

// Import required libraries
const osmtogeojson = require('osmtogeojson');
const https = require('https');

/**
 * Fetches the GeoJSON data for a given OSM relation ID.
 * @param {number} relationId - The OSM relation ID.
 * @returns {Promise<Object>} - A promise that resolves to the GeoJSON data.
 */
function fetchGeoJson(relationId) {
  // Create the Overpass query to retrieve the GeoJSON data for the relation ID
  const query = `[out:json];relation(${relationId});out geom;`;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  return new Promise((resolve, reject) => {
    // Make an HTTPS request to the Overpass API
    https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          // Convert the received data to GeoJSON using osmtogeojson library
          const geojson = osmtogeojson(JSON.parse(data));
          resolve(geojson);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Define a route to handle '/districts' requests
app.get('/districts', async (req, res) => {
  try {
    // Fetch the GeoJSON data for multiple OSM relation IDs in parallel using Promise.all
    const [/*geojson1,*/ geojson2, geojson3, geojson4, geojson5, geojson6, geojson7, geojson8, geojson9, geojson10, geojson11, geojson12, geojson13, geojson14, geojson15] = await Promise.all([
      //fetchGeoJson(417442), // York County
      fetchGeoJson(15798307), // York City School District
      fetchGeoJson(15798797), // York Suburban School District
      fetchGeoJson(15805026), // West York Area School District
      fetchGeoJson(15806951), // Central York School District
      fetchGeoJson(15807383), // Dallastown Area School District
      fetchGeoJson(15831564), // Spring Grove Area School District
      fetchGeoJson(15877595), // Red Lion Area School District
      fetchGeoJson(16474031), // Hanover Public School District
      fetchGeoJson(15887145), // South Western School District
      fetchGeoJson(16474077), // Eastern York School District
      fetchGeoJson(16474106), // South Eastern School District
      fetchGeoJson(16474115), // Southern York School District
      fetchGeoJson(16474177), // Northeastern York School District
      fetchGeoJson(16479008), // Dover Area School District
    ]);

    // Render the 'districtmap' view with the fetched GeoJSON data
    res.render('districtmap', { /*geojson1,*/ geojson2, geojson3, geojson4, geojson5, geojson6, geojson7, geojson8, geojson9, geojson10, geojson11, geojson12, geojson13, geojson14, geojson15 });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// ____           _____ _____ _____      _____        _____ ______  _____ 
//|  _ \   /\    / ____|_   _/ ____|    |  __ \ /\   / ____|  ____|/ ____|
//| |_) | /  \  | (___   | || |         | |__) /  \ | |  __| |__  | (___  
//|  _ < / /\ \  \___ \  | || |         |  ___/ /\ \| | |_ |  __|  \___ \ 
//| |_) / ____ \ ____) |_| || |____     | |  / ____ \ |__| | |____ ____) |
//|____/_/    \_\_____/|_____\_____|    |_| /_/    \_\_____|______|_____/ 
//any page that does not have very much code. These are likely pages that are not yet finished. 
//any Misc. Page should probably also go here. 

//home 
app.get('/', function (req,res) {
    res.render('home.ejs')
})