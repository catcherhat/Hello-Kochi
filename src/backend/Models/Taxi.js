const Mongoose = require("mongoose");

var TaxiModel = Mongoose.model(
    "Taxi",
    new Mongoose.Schema(
        {
            name:{type:String, required:true},
            pass:{type:String, required:true},
            city:{type:String, required: true},
            
        }
    )
)

module.exports = {TaxiModel};