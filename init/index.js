// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// async function main() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
// }

// main().then(() => {
//     console.log("Connected to DB");
// }).catch((err) => {
//     console.log(err);
// });


// const initDB = async () => {
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj) => ({...obj, owner : "68fd12b65149ef05df3b3e5c"}))
//     await Listing.insertMany(initData.data);
//     console.log("Data was initialized");
// }


// initDB();









// 1. Add these lines at the top
require('dotenv').config(); 

const maptilerClient = require("@maptiler/client");

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// 2. Add your Maptiler API key (make sure the .env variable name is correct)
maptilerClient.config.apiKey = process.env.MAP_TOKEN; 

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

// 3. This is the updated initDB function that adds geometry
const initDB = async () => {
    // Delete all old listings
    await Listing.deleteMany({});

    // Loop over each listing in data.js
    const listingsWithGeometry = await Promise.all(
        initData.data.map(async (obj) => {
            try {
                // Geocode the location
                const result = await maptilerClient.geocoding.forward(obj.location, {
                    limit: 1,
                });

                // Create the new object with owner and geometry
                const newObj = {
                    ...obj,
                    owner: "68fd12b65149ef05df3b3e5c", // Your default owner ID
                    geometry: {
                        type: "Point",
                        coordinates: result.features[0].geometry.coordinates,
                    },
                };
                return newObj;

            } catch (err) {
                console.log(`Error geocoding ${obj.location}:`, err.message);
                return null; // Return null for failed geocoding
            }
        })
    );
    
    // Filter out any listings that failed to geocode
    const validListings = listingsWithGeometry.filter(listing => listing !== null);

    // Insert the new, updated data
    await Listing.insertMany(validListings);
    console.log("Data was initialized with geometry!");
};

initDB();