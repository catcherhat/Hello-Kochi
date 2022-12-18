const Mongoose = require('mongoose');

var TouristModel = Mongoose.model(
    "Tourist",
    new Mongoose.Schema(
        {
            user:{type:String, required:true},
            password:{type:String, required:true},
           city:{type:String, required:true},
           
        }
    )
)

module.exports = {TouristModel};