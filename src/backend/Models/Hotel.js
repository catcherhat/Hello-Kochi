const Mongoose = require("mongoose");

var HotelModel = Mongoose.model(
    "Hotel",
    new Mongoose.Schema(
        {
            name:{type:String, required:true},
            pass:{type:String, required:true},
            hotelname:{type:String, required: true},
           
        }
    )
)

module.exports = {HotelModel};