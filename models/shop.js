const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
   Title: {
      type: String
   },
   Description: {
      type: String
   },
   Price: {
      type: Number
   },
   Hasorder: Boolean,
})

const Shop = mongoose.model('Shop', ShopSchema)

module.exports = Shop;