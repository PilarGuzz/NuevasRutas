const {request, response} = require('express');
const User = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { status } = require('express/lib/response');


const getUsers = async(req, res) => {
    const users = await User.find();
    res.json(users);
}

const addUser = async(req, res) => {

    const { name, email, password, rol} = req.body;
   

    // Encriptar la contraseña
    const user = new User({name, email, password, rol})
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );


    
    await user.save();

    res.json(
        user
    )

}

const deleteUser = async(req=request, res=response) => {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, {"status": false})
    const authenticateUser = req.user;
    //const uid = req.uid
    res.json(authenticateUser);
}

const editUser = async(req=request, res=response) => {
    const userid = req.params.id;
    //Recoge del body lo parametros entre {}
   /* const { name, email, rol} = req.body;*/
    //Obvia el _id y el email y recoge el resto
    const { _id, email, ...userBody} = req.body;
   
    const salt = bcryptjs.genSaltSync();
    userBody.password = bcryptjs.hashSync( userBody.password, salt );

   
    const userU = await User.findByIdAndUpdate(userid, userBody);
   
    res.json(userU);
}

module.exports = {addUser, getUsers, deleteUser, editUser}