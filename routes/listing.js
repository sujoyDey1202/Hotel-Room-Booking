const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


// index routh and // create Routh
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));

 // New Routh
 router.get("/new",isLoggedIn, listingController.renderNewForm);
 
// show , update and delete Routh
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

//  edit Routh
 router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editListing));

 module.exports = router;
