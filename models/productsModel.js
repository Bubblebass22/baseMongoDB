const mongoose = require("../config/mongodb")

const productSchema = mongoose.Schema({
    title: {
    type: String,
    required: [true, "El campo es obligatorio"],    
    },
    price: {
    type: Number,
    min:[0, "Debe introducir un valor mayor a 0"],
    get: function (value)    {
        return value * 1.21;
    },
  
    },
    description: String,
    quantity: Number,
    status: String,
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "categories",
    },
})

productSchema.virtual("price_currency").get(function(){
    return  `$ ${this.price} IVA incluido`
})

productSchema.set("toJSON", {getters: true, setters: true, virtuals: true})
const productsModel = mongoose.model("productos", productSchema);

module.exports = productsModel;