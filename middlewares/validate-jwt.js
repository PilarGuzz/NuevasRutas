const {request, response} = require('express');
const jwt = require('jsonwebtoken')
const User = require('../models/usuario')

const validateJWT = async (req = request, res=response, next) =>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try{
        //const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //El objeto que recibo por el request se mantiene en el resto de peticiones que se envia el middleware
        //y se le pueden ir añadieno propiedades
        
        const user = await User.findById(uid) 

        if(!user){
            return res.status(401).json({
                msg: 'Token no valido - usuario desabilitado'
            })
        }

        if(!user.status){
            return res.status(401).json({
                msg: 'Token no valido - usuario desabilitado'
            })
        }
        req.user = user;
        next();
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    validateJWT
}