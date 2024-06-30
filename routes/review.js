const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn , isAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

// review post Routh
router.post("/", validateReview, isLoggedIn, wrapAsync(reviewController.createReview));

// Review delete Routh
router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;