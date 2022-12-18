const Mongoose = require("mongoose");

var GuideModel = Mongoose.model(
    "Guide",
    new Mongoose.Schema(
        {
            name:{type:String, required:true},
            pass:{type:String, required:true},
            city:{type:String, required: true},
            
        }
    )
)

module.exports = {GuideModel};