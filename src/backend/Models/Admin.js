const Mongoose = require('mongoose');

var AdminModel = Mongoose.model(
    "Admin",
    new Mongoose.Schema(
        {
            user:{type:String, required:true},
            password:{type:String, required:true}
        }
    )
)

module.exports = {AdminModel};