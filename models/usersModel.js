const mongoose = require("../config/mongodb")
const bcrypt = require("bcrypt")

const usersSchema = mongoose.Schema({
    name:String,
    lastname: String,
    email: String,
    password: String,
});

usersSchema.pre("save", function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});


const productsModel = mongoose.model("users", usersSchema);

module.exports = productsModel;