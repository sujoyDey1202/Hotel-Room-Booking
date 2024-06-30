const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");

module.exports.isLoggedIn =(req,res,next)=> {
    if(!req.isAuthenticated()){
        req.session.redirecturl = req.originalUrl;
        req.flash("error", "You must be logged!");
        return res.redirect("/listings");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirecturl){
    res.locals.redirectUrl = req.session.redirecturl;
    }
    next();
};

module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params; 
     let listing = await Listing.findById(id);
     if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have the permission to edit!");
        return res.redirect(`/listings/${id}`);
     }
     next();
};

module.exports.validateListing =  (req,res,next) => {
    let {error} = listingSchema.validate(req.body); 
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);3
    }else{
        next();
    }
};

module.exports.validateReview =  (req,res,next) => {
    let {error} = reviewSchema.validate(req.body); 
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);3
    }else{
        next();
    }
};

module.exports.isAuthor = async(req,res,next)=>{
    let {id,reviewId} = req.params; 
     let review = await Review.findById(reviewId);
     if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have the permission to edit!");
        return res.redirect(`/listings/${id}`);
     }
     next();
};
