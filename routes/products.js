var express = require('express');
var router = express.Router();

const productsController = require("../controllers/productsController");

/* GET users listing. */
router.get('/', productsController.getAll);
 
//Leer un producto
router.get('/:id', productsController.getById);

//Crear un producto
//router.post('/', productsController.create);
router.post('/',(req,res,next)=>req.app.verifyToken(req,res,next), productsController.create);

//Actualiza un proudcto
router.put('/:id',(req,res,next)=>req.app.verifyToken(req,res,next), productsController.update);

//Eliminar
router.delete('/:id',(req,res,next)=>req.app.verifyToken(req,res,next), productsController.deleteProduct);




module.exports = router;
