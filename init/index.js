const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongoURL = "mongodb://127.0.0.1:27017/wanderlust";
main().then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(mongoURL);
};

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner : "6671a971ffe27bfee1fc201a"})); 
    await Listing.insertMany(initData.data);
    console.log("data is initialized");
};
initDB();