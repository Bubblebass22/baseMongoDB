const productsModel = require ("../models/productsModel")

const getAll = async function(req, res, next) {
  try {    
    console.log(req.query) //Query String para buscar por rangos ej: precio, categoria
   const documents = await productsModel.find()
   .populate({
    path:"category",
    select: "name",
   })
   .sort({price:-1,name:-1})//price -1 ordena propiedad de forma descendente, 1 ascendente
   res.json(documents)

 }catch(e){
  console.log(e)
  next(e);
 }
 
  };

 const getById = async function(req, res, next) {
  try {    
    console.log(req.quey) //Query String para buscar por rangos ej: precio, categoria
   const documents = await productsModel.findById(req.params.id)
   res.json(documents)

 }catch(e){
  console.log(e);
  res.json(e.message);
 }


};

const create = async function(req, res, next) {
   try{
    const product = new productsModel({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        category: req.body.category,
    })
   const document = await product.save()
   res.json(document)
   }catch(e){
    console.log(e);
    res.status(400).json(e.message);
   }
  };

const update = async function(req, res, next) {
    console.log(req.params.id)
    console.log(req.body); //parametro de la URL
    try {    
      console.log(req.query) 
     const document = await productsModel.updateOne({_id:req.params.id}, req.body)
     res.json(document)
  
   }catch(e){
    console.log(e)
   }
  }

  const deleteProduct = async function(req, res, next) {
    console.log(req.params.id);
    try {    
      console.log(req.query) 
     const document = await productsModel.deleteOne({_id:req.params.id})
     res.json(document)
  
   }catch(e){
    console.log(e)
   }
  };

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteProduct,
};