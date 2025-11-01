const Listing = require("../models/listing.js");
const {listingSchema} = require("../schema.js");
const maptilerClient = require('@maptiler/client');
const mapToken = process.env.MAP_TOKEN;
maptilerClient.config.apiKey = mapToken;

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};


module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};



module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path : "reviews", populate : {
        path : "author",
    }}
    ).
    populate("owner");
    if(!listing) {
        req.flash("error", "Listing you requested for, does not exist!");
        res.redirect("/listings");
    }
    else res.render("listings/show.ejs", {listing});
};



module.exports.createListing = async (req, res) => {
    const response = await maptilerClient
    .geocoding.
    forward(
        req.body.listing.location,
        {limit : 1}
    );

    let url = req.file.path;
    let filename = req.file.filename;
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = response.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);

    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};


module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you requested for, does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
};



module.exports.updateListing = async (req, res) => {
    listingSchema.validate(req.body);
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing}, { new: true, runValidators: true });

    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }

    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};



module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};


module.exports.searchListing = async (req, res) => {
    let {location} = req.query;
    if(!location) {
        req.flash("error", "No search location provided!!");
        return res.redirect("/listings");
    }
    const searchQuery = { 
        location: { $regex: new RegExp(location, 'i') } 
    };

    const allListings = await Listing.find(searchQuery);
    res.render("listings/find.ejs", {allListings});
}