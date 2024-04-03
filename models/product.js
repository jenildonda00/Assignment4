var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    asin: String,
    title: String,
    imgUrl: String,
    stars: Number,
    reviews: Number,
    price: Number,
    listPrice: Number,
    categoryName: String,
    isBestSeller: Boolean,
    boughtInLastMonth: Number
});

module.exports = mongoose.model("product", productSchema);
