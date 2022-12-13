const bcryptjs = require('bcryptjs');
const {request, response} = require('express');
const { genJWT } = require('../helpers/genJWT');
const User = require('../models/usuario')

 async function postLogin (req, res){
     const {email, password} = req.body;
     try{

         //verificar que el email existe
         const user = await User.findOne({email})
         if(!user){
             return res.status(401).json({
                 msg: "Incorrect User/password - email"
             })
         }
         //verificar que el usuario esta activo
         if(!user.status){
            return res.status(401).json({
                msg: "Incorrect User/password - inactive"
            })
        }
        //verificar la contraseña
         if(!bcryptjs.compareSync(password, user.password)){
             return res.status(401).json({
                 msg: "Incorrect User/password - inactive"
             })
         }

         //Generamos el JWT
         const token = await genJWT(user._id);
         res.json({
             user,
            token
        });

     }catch(error){
         console.log(error)
         res.status(500).json({
            msg: "Error login"
         })
     }

 
}
module.exports = {postLogin}