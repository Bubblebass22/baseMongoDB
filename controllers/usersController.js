const usersModel = require ("../models/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

module.exports = {
    getAll:async function(req,res,next){
        try{
            const usuarios = await usersModel.find()
            res.json(usuarios)
         }catch(e){
            next(e)
         }
     },
     create: async function (req,res,next){
        try{
            console.log(req.body)
            console.log(req.body.name);

            const document = new usersModel({
                name:req.body.name,
                lastname:req.body.lastname,
                email:req.body.email,
                password:req.body.password,
            })
            const response = await document.save()

            res.status(201).json(response);
        } catch(e){
            next(e)
        }
     },
     login: async function (req,res,next){
        try{
          const document = await usersModel.findOne({email: req.body.email});
          if(!document){
            return res.json({message: "El email y/o contraseña son incorrectos"}) // se le pone un return para que corte la ejecucion sino entra en un bucle.
          }    
          if(bcrypt.compareSync(req.body.password, document.password)) {
            const token = jwt.sign({userId:document._id}, req.app.get("secretKey"), {expiresIn:"1h"})
            res.json(token);
          } else{              
              return res.json({message: "El email y/o contraseña son incorrectos"}) 
          }       
        } catch(e){
            next(e)
        }
     },
};